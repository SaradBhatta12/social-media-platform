export const TitleDesc = ({ title, description }) => {
  return (
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};
