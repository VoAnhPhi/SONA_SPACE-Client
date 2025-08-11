interface BannerSectionProps {
  title: string;
  height?: string;
}

export const BannerSection = ({ title, height = "100dvh" }: BannerSectionProps) => {
  return (
    <>
      {/* Hero Banner */}
      <section className="hero-banner" style={{ height }}>
        <div className="container-fluid">
          <div className="banner-image">
            <h1 className="hero-banner__title">{title}</h1>
          </div>
        </div>
      </section>
    </>
  );
};
