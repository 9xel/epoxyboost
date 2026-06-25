type ScrollAnchorProps = {
  id: string;
};

export function ScrollAnchor({ id }: ScrollAnchorProps) {
  return <div id={id} className="eb-scroll-anchor" aria-hidden="true" />;
}
