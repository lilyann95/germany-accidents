const ResultCard = ({ answer, question }) => {
  return (
    <>
      <div className="w-full h-[20vh] bg-green-50 rounded-md border border-green-300 p-2 my-3">
        <h4 className="text-sm font-medium text-gray-700">Result</h4>
        <h1 className="font-bold text-2xl text-green-500 py-2">{answer}3333</h1>
        <h3 className="text-sm text-gray-600">{question}fddfffdffdff</h3>
      </div>
    </>
  );
};

export default ResultCard;
