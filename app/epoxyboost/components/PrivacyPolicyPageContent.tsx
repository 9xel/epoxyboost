import { privacyPolicyPage } from "../lib/privacy-policy";

function PrivacyPolicySectionContent({
  paragraphs,
  listItems,
  trailingParagraphs,
}: {
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  trailingParagraphs?: readonly string[];
}) {
  return (
    <>
      {paragraphs?.map((paragraph) => (
        <p key={paragraph}>
          {paragraph.includes("reply STOP") ? (
            <>
              To stop receiving text messages, reply <strong>STOP</strong>. Message and data rates may
              apply.
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}
      {listItems ? (
        <ul>
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {trailingParagraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export function PrivacyPolicyPageContent() {
  return (
    <>
      <div className="minimal-page__hero-bg">
        <section className="minimal-page__hero">
          <div className="hc-container minimal-page__hero-inner">
            <h1 className="minimal-page__hero-title">{privacyPolicyPage.h1}</h1>
          </div>
        </section>
      </div>

      <section className="minimal-page__content" aria-label="Privacy Policy">
        <div className="hc-container minimal-page__inner">
          <p className="minimal-page__meta">
            <strong>Last Updated: {privacyPolicyPage.lastUpdated}</strong>
          </p>
          <p className="minimal-page__intro">{privacyPolicyPage.intro}</p>

          {privacyPolicyPage.sections.map((section) => (
            <div key={section.heading} className="minimal-page__section">
              <h2>{section.heading}</h2>
              {section.heading === "12. Contact Us" ? (
                <>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <address className="minimal-page__contact">
                    <p>
                      <strong>EpoxyBoost</strong>
                      <br />
                      {privacyPolicyPage.legalEntityName}
                      <br />
                      {privacyPolicyPage.contactMailingAddress}
                      <br />
                      Email:{" "}
                      <a href={`mailto:${privacyPolicyPage.contactEmail}`}>
                        {privacyPolicyPage.contactEmail}
                      </a>
                    </p>
                    <p>Privacy Contact: EpoxyBoost Privacy Officer</p>
                  </address>
                </>
              ) : (
                <PrivacyPolicySectionContent
                  paragraphs={section.paragraphs}
                  listItems={section.listItems}
                  trailingParagraphs={section.trailingParagraphs}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
