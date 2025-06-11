export const BannerSection = ({ title }: { title: string }) => {
  return (
    <>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container-fluid">
          <div className="banner-image">
            <h1 className="hero-banner__title">{title}</h1>
          </div>
        </div>
      </section>
    </>
  );
};
