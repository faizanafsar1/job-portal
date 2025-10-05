import Icon from "./Icon";

export default function IconAndLabelBtn({ label, type, onClick, icon, className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`p-2.5 cursor-pointer items-center flex gap-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 focus:shadow-inner focus:bg-gray-200 ${className}`}
    >
      <Icon icon={icon} size="lg" />
      <label>{label}</label>
    </button>
  );
}
