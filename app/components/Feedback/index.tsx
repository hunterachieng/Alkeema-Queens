import { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<'good' | 'neutral' | 'bad' | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      experience: selectedEmoji,
      feedback,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">How was your experience?</h2>
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
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
