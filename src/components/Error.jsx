const Error = ({ message }) => {
  return (
    <div className="bg-red-500 text-white text-center py-2 rounded-lg">
      {message}
    </div>
  );
};

export default Error;
