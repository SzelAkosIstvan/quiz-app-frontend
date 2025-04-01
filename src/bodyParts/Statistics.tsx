import React, {useEffect, useState} from "react";
import axios from 'axios';

async function generateChart(): Promise<string> {
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
                text: 'Question has to be shown here',
            }
        }
    };

    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;

    try {
        const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
    } catch (error) {
        console.error('Error generating chart:', error);
        throw error;
    }
}

const Statistics = () => {
    const [chartImage, setChartImage] = useState<string | null>(null);

    useEffect(() => {
        generateChart().then(imageUrl => {
            setChartImage(imageUrl);
        });
    }, []);

    return (
        <div className="question-statistics">
            {chartImage ? <img src={chartImage} alt="Generated Chart" /> : <p>Loading chart...</p>}
        </div>
    );
}

export default Statistics;