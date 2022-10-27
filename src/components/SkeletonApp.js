import ContentLoader from 'react-content-loader';

const SkeletonApp = () => {
  return (
    <ContentLoader
      speed={2}
      width={199}
      height={400}
      viewBox="0 80 320 495"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="267" height="348" />
      <rect x="0" y="376" rx="0" ry="0" width="267" height="48" />
      <rect x="0" y="452" rx="0" ry="0" width="158" height="36" />
      <rect x="222" y="452" rx="0" ry="0" width="44" height="36" />
    </ContentLoader>
  );
};

export default SkeletonApp;
