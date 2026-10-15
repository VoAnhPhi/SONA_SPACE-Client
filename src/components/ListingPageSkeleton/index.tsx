import PageHero from "../PageHero";
import { PageSectionSkeleton, SkeletonBlock } from "../StateFeedback";

interface ListingPageSkeletonProps {
  /** Class of the page root, so page-level spacing applies while loading */
  pageClassName: string;
  /** Class of the section that holds the filter and the grid on the loaded page */
  sectionClassName: string;
}

// Loading state of a product listing page (category, room): page hero, filter bar and product
// grid drawn with the real wrappers and filter classes, so nothing moves when the data arrives
export default function ListingPageSkeleton({
  pageClassName,
  sectionClassName,
}: ListingPageSkeletonProps) {
  return (
    <div className={pageClassName} aria-busy="true">
      <PageHero title="" loading />
      <section className={sectionClassName}>
        <div className="container">
          <div className="pf" aria-hidden="true">
            <div className="pf-cats">
              <SkeletonBlock width={72} height={36} />
              <SkeletonBlock width={72} height={36} />
              <SkeletonBlock width={72} height={36} />
              <SkeletonBlock width={72} height={36} />
            </div>
            <div className="pf-bar">
              <SkeletonBlock width={96} height={36} />
              <SkeletonBlock width={96} height={36} />
              <SkeletonBlock width={96} height={36} />
              <span style={{ marginLeft: "auto" }}>
                <SkeletonBlock width={132} height={36} />
              </span>
            </div>
          </div>
        </div>
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              <PageSectionSkeleton count={8} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
