import React, {useEffect, useState} from "react";

async function generateChart(question: String): Promise<string> {
    const chartConfig = {
        type: 'bar',
        data: {
            datasets: [{
                label: "a)",
                data: [65]
            },{
                label: "b)",
                data: [12],
            },{
                label: "c)",
                data: [35],
            },{
                label: "d)",
                data: [60],
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: question,
            }
        }
    };

    return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
}

type QuestionProps = {
    question: String;
}

const Statistics = ({question}: QuestionProps) => {
    const [chartImage, setChartImage] = useState<string | null>(null);

    useEffect(() => {
        generateChart(question).then(imageUrl => {
            setChartImage(imageUrl);
        });
    }, [question]);

    return (
        <div className="question-statistics">
            {chartImage ? <img src={chartImage} alt="Generated Chart" /> : <p>Loading chart...</p>}
        </div>
    );
}

export default Statistics;