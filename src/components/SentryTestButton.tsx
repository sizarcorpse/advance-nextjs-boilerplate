"use client";

const SentryTestButton = () => {
  const handleException = () => {
    try {
      throw new Error("Sentry test error");
    } catch (error) {
      throw new Error("Sentry test error");
    }
  };

  return (
    <>
      <button
        onClick={handleException}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Test Sentry
      </button>
    </>
  );
};

export default SentryTestButton;
