const LicenseInfo = () => {
  return (
    <>
      <div className="py-3">
        <h3 className="text-lg font-bold text-gray-600">License information</h3>
        <div className="bg-orange-50 rounded-md border border-orange-300 p-2">
          <p className="text-md text-gray-600">
            This dataset is provided by the Federal Statistical Office of
            Germany (Destatis) and Open.NRW.
          </p>
          <p className="text-md text-gray-600">
            Unfallatlas and Gemeindeverzeichnis data are licensed under Data
            License Germany – Attribution 2.0 (DL-DE–BY-2.0).
          </p>
          <p className="text-md text-gray-600">
            GENESIS Online data is used under the respective GENESIS terms of
            use and requires attribution.
          </p>
        </div>
      </div>
    </>
  );
};

export default LicenseInfo;
