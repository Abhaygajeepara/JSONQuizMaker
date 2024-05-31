import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Question = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const jsonInput = useSelector(state => state.jsonInput); 
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);
    const [submitted, setSubmitted] = useState(false); 

    useEffect(() => {
        if (jsonInput) {
            try {
                const parsedJson = JSON.parse(jsonInput);
                if (parsedJson.quiz) {
                    // Map over the quiz array and create QuestionModel objects
                    const formattedQuestions = parsedJson.quiz.map(q => ({
                        question: q.question,
                        options: q.options,
                        answer: q.answer,
                        userAnswer: '' // Set initial userAnswer as an empty string
                    }));
                    setQuestions(formattedQuestions); // Update state with formatted questions
                    setIsLoaded(true);
                } else {
                    setIsLoaded(false);
                }
            } catch (error) {
                toast.error('Invalid JSON input');
            }
        }
    }, [jsonInput]);

    const handleOptionChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].userAnswer = questions[questionIndex].options[optionIndex];
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questions.every(question => question.userAnswer !== '')) {
            // All questions are answered
            const newScore = calculateScore();
            setScore(newScore);
            toast.success(`Your score: ${newScore}/${questions.length}`);
            setSubmitted(true); // Set submitted to true after successful submission
        } else {
            // Not all questions are answered
            toast.error('Please answer all questions.');
        }
    };

    const calculateScore = () => {
        return questions.reduce((totalScore, question) => {
            return totalScore + (question.userAnswer === question.answer ? 1 : 0);
        }, 0);
    };

    useEffect(() => {
        setAttemptedQuestions(questions.filter(question => question.userAnswer !== '').length);
    }, [questions]);

    return (
        <form onSubmit={handleSubmit} className="bg-white h-screen flex flex-col">
            <div className="flex-1 overflow-auto">
                {isLoaded && (
                    questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="p-4">
                            <h1 className="text-2xl font-bold">{questionIndex+1}. {question.question}</h1>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className="text-lg">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name={`question${questionIndex}`} 
                                                value={optionIndex} 
                                                onChange={() => handleOptionChange(questionIndex, optionIndex)}
                                                checked={question.userAnswer === question.options[optionIndex]}
                                                required // Make the radio buttons required
                                                className='mr-2'
                                                disabled={submitted} // Disable input if form is submitted
                                            />
                                           {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
            <div className="grid grid-cols-2 justify-end items-center bg-barBackground p-2 ">
                <h1 className="text-2xl font-bold">
                   {!submitted ? `Attempted Questions: ${attemptedQuestions}/ ${questions.length}` : `Score: ${score} / ${questions.length}`}
                </h1>
                <button 
                    type="submit" 
                    className="bg-barButtonBackground text-white p-2 rounded"
                    disabled={submitted} // Disable submit button if form is submitted
                >
                    {submitted ? 'Submitted' : 'Submit'}
                </button>
            </div>
        </form>
    );
}

export default Question;
