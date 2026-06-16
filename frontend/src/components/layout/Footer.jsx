const Footer = () => {
  return (
    <>
      <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw] my-3">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 shadow-lg rounded-md p-5">
          <div>
            <h3 className="text-xl text-[#964b2b] font-bold">Data Sources</h3>
            <p className="text-md text-gray-600 mt-2">
              <span className="text-lg font-semibold text-gray-600">
                Traffic accident data:{" "}
              </span>
              Based on the German Unfallatlas,
            </p>
            <p className="text-md text-gray-600 mt-2">
              Supplemented with regional statistics from the GENESIS database
              and official administrative region keys (AGS/GV-ISys)
            </p>
            <p className="text-md text-gray-600">
              <span className="text-lg font-semibold text-gray-600">
                Provider:{" "}
              </span>
              Federal Statistical Office of Germany (Destatis){" "}
            </p>
            <p className="text-md text-gray-600">
              <span className="text-lg font-semibold text-gray-600">
                Coverage:{" "}
              </span>{" "}
              2016 - 2024
            </p>
          </div>

          <div>
            <h3 className="text-xl text-[#964b2b] font-bold">Licenses</h3>
            <p className="text-md text-gray-600 mt-1">
              <span className="text-lg font-semibold text-gray-600">
                License:{" "}
              </span>
              Data License Germany – Attribution 2.0 (DL-DE–BY-2.0).
            </p>
            <p className="text-md text-gray-600">
              This dataset is provided by the Federal Statistical Office of
              Germany (Destatis) and Open.NRW.
            </p>

            <p className="text-md text-gray-600">
              GENESIS Online data is used under the respective GENESIS terms of
              use and requires attribution.
            </p>
          </div>
        </div>

        {/* <hr className="my-5 border-gray-300" /> */}

        <p className="text-gray-600 text-sm text-center my-5">
          © 2026 Traffic Accident Query Service System. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
