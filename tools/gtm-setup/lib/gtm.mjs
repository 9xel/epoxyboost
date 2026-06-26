function workspaceParent(accountId, containerId, workspaceId) {
  return `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`;
}

function containerParent(accountId, containerId) {
  return `accounts/${accountId}/containers/${containerId}`;
}

export async function listAccountsAndContainers(tagmanager) {
  const { data } = await tagmanager.accounts.list();
  const rows = [];

  for (const account of data.account ?? []) {
    const containers = await tagmanager.accounts.containers.list({ parent: account.path });
    for (const container of containers.data.container ?? []) {
      rows.push({
        accountName: account.name,
        accountId: account.accountId,
        containerName: container.name,
        containerId: container.containerId,
        publicId: container.publicId,
      });
    }
  }

  return rows;
}

export async function getOrCreateWorkspace(tagmanager, accountId, containerId, workspaceName) {
  const parent = containerParent(accountId, containerId);
  const { data } = await tagmanager.accounts.containers.workspaces.list({ parent });
  const existing = (data.workspace ?? []).find((workspace) => workspace.name === workspaceName);
  if (existing) {
    return existing.workspaceId;
  }

  const created = await tagmanager.accounts.containers.workspaces.create({
    parent,
    requestBody: {
      name: workspaceName,
      description: "Created by gtm-setup",
    },
  });

  return created.data.workspaceId;
}

async function listByName(tagmanager, listFn, parent) {
  const { data } = await listFn({ parent });
  const key = Object.keys(data).find((k) => Array.isArray(data[k]));
  const items = key ? data[key] : [];
  return new Map(items.map((item) => [item.name, item]));
}

export async function ensureTrigger(tagmanager, parent, existingTriggers, body) {
  const found = existingTriggers.get(body.name);
  if (found) {
    console.log(`  trigger exists: ${body.name}`);
    return found.triggerId;
  }

  const created = await tagmanager.accounts.containers.workspaces.triggers.create({
    parent,
    requestBody: body,
  });
  console.log(`  created trigger: ${body.name}`);
  return created.data.triggerId;
}

export async function ensureTag(tagmanager, parent, existingTags, body) {
  const found = existingTags.get(body.name);
  if (found) {
    console.log(`  tag exists: ${body.name}`);
    return found.tagId;
  }

  const created = await tagmanager.accounts.containers.workspaces.tags.create({
    parent,
    requestBody: body,
  });
  console.log(`  created tag: ${body.name}`);
  return created.data.tagId;
}

export function allPagesTrigger() {
  return {
    name: "All Pages",
    type: "pageview",
  };
}

export function customEventTrigger(name, eventName) {
  return {
    name,
    type: "customEvent",
    customEventFilter: [
      {
        type: "equals",
        parameter: [
          { type: "template", key: "arg0", value: "{{_event}}" },
          { type: "template", key: "arg1", value: eventName },
        ],
      },
    ],
  };
}

export function googleTagConfig(name, measurementId, triggerId) {
  return {
    name,
    type: "googtag",
    parameter: [{ type: "template", key: "tagId", value: measurementId }],
    firingTriggerId: [triggerId],
  };
}

export function ga4EventTag(name, eventName, triggerId, measurementId) {
  return {
    name,
    type: "gaawe",
    parameter: [
      { type: "template", key: "eventName", value: eventName },
      { type: "template", key: "measurementIdOverride", value: measurementId },
    ],
    firingTriggerId: [triggerId],
  };
}

export function googleAdsConversionTag(name, conversionId, conversionLabel, triggerId) {
  return {
    name,
    type: "awct",
    parameter: [
      { type: "template", key: "conversionId", value: conversionId },
      { type: "template", key: "conversionLabel", value: conversionLabel },
    ],
    firingTriggerId: [triggerId],
  };
}

export async function loadWorkspaceMaps(tagmanager, accountId, containerId, workspaceId) {
  const parent = workspaceParent(accountId, containerId, workspaceId);
  const [triggers, tags] = await Promise.all([
    listByName(tagmanager, tagmanager.accounts.containers.workspaces.triggers.list.bind(tagmanager.accounts.containers.workspaces.triggers), parent),
    listByName(tagmanager, tagmanager.accounts.containers.workspaces.tags.list.bind(tagmanager.accounts.containers.workspaces.tags), parent),
  ]);

  return { parent, triggers, tags };
}

export async function publishWorkspace(tagmanager, accountId, containerId, workspaceId, notes) {
  const parent = workspaceParent(accountId, containerId, workspaceId);
  const version = await tagmanager.accounts.containers.workspaces.create_version({
    parent,
    requestBody: {
      name: notes,
      notes,
    },
  });

  const containerVersionId = version.data.containerVersion.containerVersionId;
  await tagmanager.accounts.containers.versions.publish({
    path: `accounts/${accountId}/containers/${containerId}/versions/${containerVersionId}`,
  });
}

export async function setupContainer(tagmanager, config) {
  const workspaceName = config.workspaceName ?? "API Setup";
  const events = config.events.map((event) => ({
    name: event.name,
    ga4: event.ga4 !== false,
    adsConversionLabel: event.adsConversionLabel ?? null,
  }));

  console.log(`\nSetting up GTM for ${config.projectName}`);
  console.log(`  account: ${config.accountId}`);
  console.log(`  container: ${config.containerId}`);
  console.log(`  workspace: ${workspaceName}`);
  console.log(`  GA4: ${config.ga4MeasurementId}\n`);

  const workspaceId = await getOrCreateWorkspace(
    tagmanager,
    config.accountId,
    config.containerId,
    workspaceName,
  );

  const { parent, triggers, tags } = await loadWorkspaceMaps(
    tagmanager,
    config.accountId,
    config.containerId,
    workspaceId,
  );

  const allPagesTriggerId = await ensureTrigger(
    tagmanager,
    parent,
    triggers,
    allPagesTrigger(),
  );

  await ensureTag(
    tagmanager,
    parent,
    tags,
    googleTagConfig("Google tag - GA4 Config", config.ga4MeasurementId, allPagesTriggerId),
  );

  const triggerIdsByEvent = new Map();

  for (const event of events) {
    const triggerName = `CE - ${event.name}`;
    const triggerId = await ensureTrigger(
      tagmanager,
      parent,
      triggers,
      customEventTrigger(triggerName, event.name),
    );
    triggerIdsByEvent.set(event.name, triggerId);

    if (event.ga4) {
      await ensureTag(
        tagmanager,
        parent,
        tags,
        ga4EventTag(`GA4 Event - ${event.name}`, event.name, triggerId, config.ga4MeasurementId),
      );
    }

    if (event.adsConversionLabel && config.googleAds?.conversionId) {
      await ensureTag(
        tagmanager,
        parent,
        tags,
        googleAdsConversionTag(
          `Google Ads - ${event.name}`,
          config.googleAds.conversionId,
          event.adsConversionLabel,
          triggerId,
        ),
      );
    }
  }

  if (config.publish) {
    const notes = `gtm-setup publish ${new Date().toISOString()}`;
    await publishWorkspace(tagmanager, config.accountId, config.containerId, workspaceId, notes);
    console.log("\nPublished container version.");
  } else {
    console.log("\nDone. Preview in GTM Tag Assistant, then publish manually.");
  }

  return { workspaceId };
}
