"use client";

export default function Banner() {
  return (
    <div className="mb-8 overflow-hidden shadow-lg bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl">
      <div className="px-8 py-12 text-white">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          {/* Content */}
          <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 text-sm font-medium text-white bg-white rounded-full bg-opacity-20">
                🏷️Promo
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Get 25% Cash Back
              </h2>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                On $200
              </h2>
              <p className="max-w-md text-lg opacity-90">
                Shopping is a bit relaxing hobby for me, wich is somtimes
                troubling for the bank balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
