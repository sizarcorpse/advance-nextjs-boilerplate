"use client";

type Props = {
  test: string;
};
const SentryTestButton: React.FC<Props> = (props) => {
  const handleException = (message: string) => {
    try {
      throw new Error(message);
    } catch (error) {
      throw new Error(message);
    }
  };

  return (
    <>
      <button
        onClick={() => handleException(props.test)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Test Sentry
      </button>
    </>
  );
};

export default SentryTestButton;
