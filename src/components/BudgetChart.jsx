import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; 
ChartJS.register(ArcElement, Tooltip, Legend);

import '../../src/styles/BudgetChart.css'

const BudgetChart = ({ transactions }) => {
    const categories = ["Food", "Rent", "Entertainment", "Other"];
    const dataValues = categories.map((cat) =>
        transactions.filter((t) => t.text.includes(cat)).reduce((sum, t) => sum + Math.abs(t.amount), 0)
    );

    const data = {
        labels: categories,
        datasets: [
            {
                data: dataValues,
                backgroundColor: ["red", "blue", "green", "orange"],
            },
        ],
    };
        const chartOptions = {
            plugins: {
                legend: {
                    lables: {
                        color: "#fff",
                        font: {
                            size: 14,
                        },
                        
                        
                        
                        
                        
                        
                        
                        
                    },
                },
            },
        };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Monthly Budget Breakdown</h2>
            <Pie data={data} options={chartOptions} />
        </div>
    );
};

    

export default BudgetChart;
