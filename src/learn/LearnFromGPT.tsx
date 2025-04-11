import React, { useState } from 'react';
import Question from "../bodyParts/Question";
import MultipleChoice from "../bodyParts/MultipleChoice";
import QuestionHeader from "../bodyParts/QuestionHeader";

const LearnFromGPT: React.FC = () => {
    const [question, setQuestion] = useState<string | null>(
        "Type in the 【﻿ＳＵＢＪＥＣＴ】 and ⓣⓞⓟⓘⓒ about what do you want to learn"
    );
    const [possibleAnswers, setPossibleAnswers] = useState<string[] | null>([]);
    const [topic, setTopic] = useState("any");
    const [subject, setSubject] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (option[0] === result) {
            console.log("Congrats!!");
            setResult(option);
        }
    };

    const sendRequest = async () => {
        const prompt = `I want to practice my knowledge. Generate a multiple-choice question from ${topic} topic in ${subject}. Provide four answer choices labeled a), b), c), and d), along with the correct answer's letter. Ensure the question has an academic background.`;
        console.log("Prompt:" ,prompt);

        const requestBody = {
            prompt: prompt,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response:", data.message);
            const responseText = data.message;

            const questionPart = responseText.match(/(Question:|^)\s*(.*?\?)/);
            const extractedQuestion = questionPart ? questionPart[2].trim() : "Could not parse question";
            setQuestion(extractedQuestion);
            console.log("Question:", extractedQuestion);

            const answerLines = responseText.split('\n').filter((line: string) => /^[a-d]\)/.test(line.trim()));
            setPossibleAnswers(answerLines);
            console.log("Answer:", answerLines);

            const lastParenIndex = responseText.lastIndexOf(')');
            if (lastParenIndex !== -1) {
                const resultLetter = responseText[lastParenIndex - 1];
                setResult(resultLetter);
                console.log("Result Letter:", resultLetter);
            } else {
                console.error("No closing parenthesis found in the response.");
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    return (
        <div style={{overflow: 'hidden'}}>
            <QuestionHeader
                sendRequest={sendRequest}
                subject={subject}
                setSubject={setSubject}
                topic={topic}
                setTopic={setTopic}
            />
            {question && (
                <>
                    <Question question={question}/>
                </>
            )}
            {possibleAnswers && (
                <>
                    <MultipleChoice possibleAnswers={possibleAnswers} onSelect={handleOptionSelect} selectedOption={selectedOption} correctOption={result} />
                </>
            )}
        </div>
    );
};

export default LearnFromGPT;