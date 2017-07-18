import Inferno from 'inferno';

function Background({ isShowing, src }) {
  return (
    <img
      className={
        isShowing
          ? 'hero__cover hero__cover--anim-in'
          : 'hero__cover hero__cover--anim-out'
      }
      src={src}
    />
  );
}

export default Background;
