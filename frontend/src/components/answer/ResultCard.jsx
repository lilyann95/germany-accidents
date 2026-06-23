const ResultCard = ({ result, question }) => {
  const renderResults = (result) => {
    if (typeof result === "number" || typeof result === "string") {
      return (
        <h1 className="font-bold text-2xl text-green-500 py-2">{result}</h1>
      );
    }

    if (Array.isArray(result)) {
      return result.map((res, index) => (
        <h1 key={index} className="font-bold text-2xl text-green-500 py-2">
          {res.name}: {res.data}
        </h1>
      ));
    }

    return null;
  };
  return (
    <>
      <div className="w-full bg-green-50 rounded-md border border-green-300 p-2 my-3">
        <h4 className="text-sm font-medium text-gray-700">Result</h4>
        {renderResults(result)}
        <h3 className="text-sm text-gray-600">{question}</h3>
      </div>
    </>
  );
};

export default ResultCard;
