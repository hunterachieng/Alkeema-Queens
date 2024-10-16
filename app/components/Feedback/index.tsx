import { useState, useEffect } from 'react';
import { sendFeedback } from '@/app/util/sendFeedback';

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<'good' | 'neutral' | 'bad' | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await sendFeedback(feedback);
    setLoading(false);
    setResponse(response?.sentiment);
    setFeedback('')
    console.log({
      experience: selectedEmoji,
      response,
    });

    setTimeout(() => {
      setResponse(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      setResponse(null);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {/* Notification Message */}
      {response && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white ${
            response.toLowerCase() === 'positive' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {response.toLowerCase() === 'positive' ? 'Thank you for your positive feedback!' : 'We appreciate your comments and apologize for the dissatisfaction you encountered.'}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center mt-16">
        <h2 className="text-2xl font-semibold mb-2 text-black">How was your experience?</h2>
        <p className="text-gray-600 mb-4">
          Your review will help us improve our product and make it user-friendly for more users.
        </p>

        <div className="flex justify-around mb-4">
          <button
            className={`text-4xl transition-transform ${
              selectedEmoji === 'good' ? 'transform scale-125' : ''
            }`}
            onClick={() => setSelectedEmoji('good')}
          >
            😊
          </button>
          <button
            className={`text-4xl transition-transform ${
              selectedEmoji === 'neutral' ? 'transform scale-125' : ''
            }`}
            onClick={() => setSelectedEmoji('neutral')}
          >
            😐
          </button>
          <button
            className={`text-4xl transition-transform ${
              selectedEmoji === 'bad' ? 'transform scale-125' : ''
            }`}
            onClick={() => setSelectedEmoji('bad')}
          >
            😢
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-600"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            {loading ? 'Loading...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
