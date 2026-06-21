const Explanation = ({ explanation }) => {
  return (
    <>
      <div className="py-3">
        <h3 className="text-lg font-bold text-gray-600">Explanation</h3>
        <p className="text-md text-gray-600">{explanation}</p>
      </div>
    </>
  );
};

export default Explanation;
