import { Course } from './course-data';
import { datavizFoundationsShortNotes } from './dataviz-foundations-short-notes';

export const datavizFoundationsCourse: Course = {
  id: "data-visualization-foundations",
  title: "Data Visualization Foundations",
  shortNotes: datavizFoundationsShortNotes,
  objectives: [
    "To understand the fundamental concepts and principles of data visualization.",
    "To learn why data visualization is crucial for modern data analysis and decision making.",
    "To identify different types of data and how they influence visualization choices.",
    "To explore various chart types and understand their appropriate use cases.",
    "To apply best practices and design principles to create effective, clear, and accurate visualizations."
  ],
  introduction: [
    "Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.",
    "In the world of Big Data, data visualization tools and technologies are essential to analyze massive amounts of information and make data-driven decisions.",
    "This course will introduce you to the core foundations of data visualization, without diving deeply into specific tools yet. You will learn the theory, the types of data, the types of charts, and the design principles that make a visualization successful."
  ],
  targetAudience: {
    primary: "Beginners to data science and analytics who want to learn the fundamental concepts of data visualization.",
    prerequisites: [
      "Basic understanding of numbers and basic statistics",
      "No programming experience required, though some Python basics are helpful"
    ],
    usefulFor: [
      "Aspiring Data Analysts and Data Scientists",
      "Business Intelligence Professionals",
      "Anyone who needs to present data effectively"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering",
    course: "Data Visualization Foundations",
    credits: "L:3 T:0 P:0 C:3",
    yearSem: "Third Year, First Semester",
    branches: "CSE, IT, and Data Science",
    totalExperiments: "5 Modules with 5 experiments",
    compiler: "Conceptual with Python examples",
    units: [
      { unit: "Unit I", topics: "What is Data Visualization?", weeks: "Module 1" },
      { unit: "Unit II", topics: "Importance of Data Visualization", weeks: "Module 2" },
      { unit: "Unit III", topics: "Types of Data", weeks: "Module 3" },
      { unit: "Unit IV", topics: "Chart Types", weeks: "Module 4" },
      { unit: "Unit V", topics: "Data Visualization Design Principles", weeks: "Module 5" }
    ]
  },
  weeks: [
    {
      title: "MODULE 1",
      objective: "What is Data Visualization?",
      tutorial: "Tutorial 1: Intro to Data Visualization",
      labTitle: "Lab 1: Core Concepts",
      experiments: [
        {
          id: "dvf-m1-1",
          title: "What is Data Visualization?",
          desc: "Understand the core definition and purpose of data visualization.",
          expected: "Able to define data visualization and explain its primary goal.",
          code: `# A simple example of plotting in Python using matplotlib
import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

# Create a plot
plt.plot(x, y, marker='o')

# Add context
plt.title("Simple Data Visualization")
plt.xlabel("X-axis (Input)")
plt.ylabel("Y-axis (Output)")

plt.show()`,
          content: {
            aim: {
              text: "This section introduces the foundational definition of data visualization and sets the stage for understanding how we transform raw data into visual insights.",
              bullets: [
                "Define Data Visualization",
                "Understand the transformation from data to visuals",
                "Identify the core components: Data, Visuals, and Context"
              ]
            },
            theory: [
              {
                title: "Defining Data Visualization",
                body: [
                  "Data visualization is the graphical representation of information and data.",
                  "By using visual elements like charts, graphs, and maps, it provides an accessible way to see and understand trends, outliers, and patterns in data.",
                  "It is the intersection of art and science: it requires analytical rigor to ensure accuracy, and design sense to ensure clarity.",
                  "![Data Visualization Overview](/dataviz_overview.png)"
                ]
              },
              {
                title: "The Core Components",
                body: [
                  "**Data:** The raw numbers, text, or facts that you are trying to understand.",
                  "**Visuals:** The graphical elements (points, lines, bars, colors) used to map the data to the screen.",
                  "**Context:** The labels, titles, annotations, and legends that give meaning to the visuals."
                ]
              }
            ],
            procedure: [
              "Review the definition of data visualization.",
              "Observe how raw numbers (like a table of X and Y values) can be difficult to interpret quickly.",
              "Map those numbers to a visual coordinate system.",
              "Add descriptive labels and a title to provide context to the reader.",
              "Evaluate how the visual representation makes the relationship between X and Y immediately obvious."
            ],
            pretest: [
              {
                question: "What is the primary goal of data visualization?",
                options: ["To make data look pretty", "To hide complex data", "To communicate information clearly and efficiently", "To replace tabular data entirely"],
                answerIndex: 2
              },
              {
                question: "Which of the following is a core component of a successful visualization?",
                options: ["Only data", "Only visuals", "Data, Visuals, and Context", "Only context"],
                answerIndex: 2
              }
            ],
            posttest: [
              {
                question: "What is the primary goal of data visualization?",
                options: ["To make data look pretty", "To hide complex data", "To communicate information clearly and efficiently", "To replace tabular data entirely"],
                answerIndex: 2
              },
              {
                question: "Data visualization combines elements of which two fields?",
                options: ["Art and Science", "Math and Physics", "History and Geography", "Chemistry and Biology"],
                answerIndex: 0
              },
              {
                question: "Which of the following is NOT a core component of visualization?",
                options: ["Data", "Context", "Visuals", "Code"],
                answerIndex: 3
              },
              {
                question: "Why is data visualization crucial in the era of Big Data?",
                options: ["To make data files smaller", "To analyze massive amounts of information and make data-driven decisions", "To hide sensitive data from users", "To replace all textual reports"],
                answerIndex: 1
              },
              {
                question: "What does the 'Context' component of data visualization refer to?",
                options: ["The color palette used", "Labels, titles, and legends that give meaning", "The raw dataset", "The programming language used"],
                answerIndex: 1
              }
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 2",
      objective: "Importance of Data Visualization",
      tutorial: "Tutorial 2: Importance of Data Visualization",
      labTitle: "Lab 2: Why Visualize Data?",
      experiments: [
        {
          id: "dvf-m2-1",
          title: "Importance of Data Visualization",
          desc: "Learn why data visualization is a critical skill in the modern data-driven world.",
          expected: "Able to articulate the benefits of data visualization for decision-making and pattern recognition.",
          code: `# Demonstrating Anscombe's Quartet concept
import matplotlib.pyplot as plt
import numpy as np

# Two datasets with similar summary statistics but different distributions
x1 = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5])
y1 = np.array([8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])

x2 = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5])
y2 = np.array([9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74])

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.scatter(x1, y1)
ax1.set_title("Dataset 1")
ax2.scatter(x2, y2)
ax2.set_title("Dataset 2")
plt.show()
# Without visualization, these datasets might look identical statistically!`,
          content: {
            aim: {
              text: "Explore why data visualization is crucial. We will understand how the human brain processes visual information compared to text, and how visualization aids in discovering hidden patterns.",
              bullets: [
                "Understand the power of visual perception",
                "Learn how visualization aids pattern recognition",
                "Discover the role of visualization in storytelling and decision making"
              ]
            },
            theory: [
              {
                title: "Visual Processing Power",
                body: [
                  "The human brain processes visual information much faster than text or numerical data.",
                  "We are wired to quickly identify shapes, colors, and spatial relationships.",
                  "This evolutionary trait makes a chart instantly readable compared to a dense spreadsheet."
                ]
              },
              {
                title: "Anscombe's Quartet",
                body: [
                  "A classic example of the importance of visualization is Anscombe's Quartet.",
                  "It consists of four datasets that have nearly identical simple descriptive statistics (mean, variance, correlation), yet have very different distributions and appear very different when graphed.",
                  "This proves that summary statistics alone are not enough to understand data; visualization is essential."
                ]
              }
            ],
            procedure: [
              "Analyze a table of numbers and try to find a trend.",
              "Plot the same numbers on a scatter plot.",
              "Notice how quickly the trend becomes apparent visually.",
              "Review the concept of Anscombe's Quartet.",
              "Conclude that visualization is a necessary step in data analysis, not just an afterthought."
            ],
            pretest: [
              {
                question: "Why is data visualization effective for humans?",
                options: ["Because humans process visual information faster than text", "Because computers prefer drawing charts", "Because it uses more colors", "Because tables are outdated"],
                answerIndex: 0
              }
            ],
            posttest: [
              {
                question: "What does Anscombe's Quartet demonstrate?",
                options: ["That 4 is a magic number", "That datasets with identical summary statistics can look very different when plotted", "That you should never use scatter plots", "That statistics are always wrong"],
                answerIndex: 1
              },
              {
                question: "Which of these is a primary benefit of data visualization?",
                options: ["Slowing down decision making", "Hiding outliers", "Storytelling and conveying narratives clearly", "Increasing data file size"],
                answerIndex: 2
              },
              {
                question: "Why do humans process visual information faster than text?",
                options: ["Because we are wired to quickly identify shapes, colors, and spatial relationships", "Because reading requires knowing different languages", "Because text files are larger in size", "Because charts always use less ink than text"],
                answerIndex: 0
              },
              {
                question: "In decision making, how does visualization help stakeholders?",
                options: ["By hiding the negative data", "By making trends and outliers obvious", "By making the data more complicated", "By replacing all numerical analysis"],
                answerIndex: 1
              },
              {
                question: "True or False: Summary statistics alone (like mean and variance) are always sufficient to understand a dataset.",
                options: ["True", "False", "Only for large datasets", "Only for small datasets"],
                answerIndex: 1
              }
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 3",
      objective: "Types of Data",
      tutorial: "Tutorial 3: Understanding Data Types",
      labTitle: "Lab 3: Data Classification",
      experiments: [
        {
          id: "dvf-m3-1",
          title: "Types of Data",
          desc: "Identify the different types of data (categorical, quantitative) and how they impact visualization choices.",
          expected: "Able to classify data into appropriate types and select compatible visual encodings.",
          code: `# Handling different types of data in Python
import pandas as pd
import matplotlib.pyplot as plt

# Creating a dataset with different data types
data = {
    'Category (Nominal)': ['Apples', 'Bananas', 'Oranges'],
    'Rank (Ordinal)': ['Low', 'Medium', 'High'],
    'Value (Quantitative)': [15.5, 20.2, 12.8]
}
df = pd.DataFrame(data)

# Visualizing quantitative data across categories
plt.bar(df['Category (Nominal)'], df['Value (Quantitative)'])
plt.title("Categorical vs Quantitative Data")
plt.show()`,
          content: {
            aim: {
              text: "Understand the fundamental types of data. The type of data you have dictates the type of chart you can create and the visual encodings you can use.",
              bullets: [
                "Differentiate between categorical and quantitative data",
                "Understand nominal vs ordinal categories",
                "Understand continuous vs discrete quantities"
              ]
            },
            theory: [
              {
                title: "Categorical Data",
                body: [
                  "Categorical data represents characteristics or groups.",
                  "**Nominal:** Categories with no inherent order (e.g., Apple, Banana, Orange; Red, Blue, Green).",
                  "**Ordinal:** Categories that have a logical order or ranking (e.g., Small, Medium, Large; Poor, Fair, Good, Excellent)."
                ]
              },
              {
                title: "Quantitative Data",
                body: [
                  "Quantitative data represents measurable quantities or amounts.",
                  "**Discrete:** Can only take specific, distinct values (e.g., number of children, number of cars). Usually counted.",
                  "**Continuous:** Can take any value within a range (e.g., height, temperature, time). Usually measured."
                ]
              }
            ],
            procedure: [
              "Examine your dataset and list all variables (columns).",
              "For each variable, ask: Is this describing a quality (categorical) or a quantity (quantitative)?",
              "If categorical, does it have a natural order? (If yes, Ordinal; if no, Nominal).",
              "If quantitative, can it be broken down infinitely? (If yes, Continuous; if no, Discrete).",
              "Use these classifications to decide which visual channels (like position, color, length) are appropriate."
            ],
            pretest: [
              {
                question: "Which of the following is an example of ordinal data?",
                options: ["Car brands (Toyota, Ford, Honda)", "Temperature in Celsius", "Education level (High School, Bachelor's, Master's)", "Weight in kilograms"],
                answerIndex: 2
              }
            ],
            posttest: [
              {
                question: "A survey asks for a person's favorite color. What type of data is this?",
                options: ["Quantitative Continuous", "Quantitative Discrete", "Categorical Ordinal", "Categorical Nominal"],
                answerIndex: 3
              },
              {
                question: "The number of emails you receive in a day is an example of:",
                options: ["Continuous data", "Discrete data", "Nominal data", "Ordinal data"],
                answerIndex: 1
              },
              {
                question: "Which of the following is an example of continuous quantitative data?",
                options: ["Number of cars in a parking lot", "Temperature throughout the day", "Types of fruit in a basket", "T-shirt sizes (S, M, L)"],
                answerIndex: 1
              },
              {
                question: "What characterizes ordinal data?",
                options: ["It has no inherent order", "It can take any numerical value", "It consists of categories that have a logical order or rank", "It is always tied to specific times or dates"],
                answerIndex: 2
              },
              {
                question: "Why is it important to classify your data before creating a chart?",
                options: ["It dictates what type of chart and visual encodings you can use", "It determines the file size of the chart", "It makes the data look more professional", "It allows you to use more colors"],
                answerIndex: 0
              }
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 4",
      objective: "Chart Types",
      tutorial: "Tutorial 4: Choosing the Right Chart",
      labTitle: "Lab 4: Common Charts",
      experiments: [
        {
          id: "dvf-m4-1",
          title: "Chart Types",
          desc: "Explore the most common chart types and learn when to use them.",
          expected: "Able to select the most appropriate chart type based on the data and the message.",
          code: `# Creating different chart types
import matplotlib.pyplot as plt

fig, axs = plt.subplots(2, 2, figsize=(10, 8))

# Bar Chart
axs[0, 0].bar(['A', 'B', 'C'], [3, 7, 2])
axs[0, 0].set_title('Bar Chart (Comparisons)')

# Line Chart
axs[0, 1].plot([1, 2, 3, 4], [10, 15, 13, 18], color='green')
axs[0, 1].set_title('Line Chart (Trends over Time)')

# Scatter Plot
axs[1, 0].scatter([5, 7, 8, 7, 2, 17, 2, 9, 4, 11], [99, 86, 87, 88, 100, 86, 103, 87, 94, 78])
axs[1, 0].set_title('Scatter Plot (Relationships)')

# Histogram
axs[1, 1].hist([1, 2, 2, 3, 3, 3, 4, 4, 5], bins=5, color='orange')
axs[1, 1].set_title('Histogram (Distribution)')

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "Familiarize yourself with the core vocabulary of charts. We will look at bar charts, line charts, scatter plots, and histograms, and understand their primary use cases.",
              bullets: [
                "Learn the purpose of a Bar Chart",
                "Learn the purpose of a Line Chart",
                "Learn the purpose of a Scatter Plot",
                "Learn the purpose of a Histogram"
              ]
            },
            theory: [
              {
                title: "Comparing Quantities: Bar Charts",
                body: [
                  "Bar charts use length/height to represent quantitative values across different categorical groups.",
                  "They are one of the most common and effective ways to compare values.",
                  "Always start the y-axis at zero to ensure accurate representation of relative sizes."
                ]
              },
              {
                title: "Showing Trends: Line Charts",
                body: [
                  "Line charts connect individual data points with lines.",
                  "They are almost exclusively used for temporal data (time series) to show how a variable changes over time.",
                  "The connection implies a relationship (continuity) between the points."
                ]
              },
              {
                title: "Exploring Relationships: Scatter Plots",
                body: [
                  "Scatter plots map two quantitative variables to the x and y axes.",
                  "They are used to identify correlations, patterns, or clusters between the two variables.",
                  "Each point represents a single observation in the dataset."
                ]
              },
              {
                title: "Chart Types Overview",
                body: [
                  "![Common Chart Types](/dataviz_chart_types.png)"
                ]
              }
            ],
            procedure: [
              "Determine the goal of your visualization: Compare? Show a trend? Show distribution? Show relationship?",
              "If comparing categories, use a Bar Chart.",
              "If showing data over time, use a Line Chart.",
              "If checking correlation between two numbers, use a Scatter Plot.",
              "If looking at how one variable is distributed, use a Histogram."
            ],
            pretest: [
              {
                question: "Which chart is best suited for showing a trend over time?",
                options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
                answerIndex: 2
              }
            ],
            posttest: [
              {
                question: "If you want to see if there is a correlation between height and weight in a group of people, which chart should you use?",
                options: ["Bar chart", "Line chart", "Scatter plot", "Histogram"],
                answerIndex: 2
              },
              {
                question: "What is a critical rule when creating a bar chart?",
                options: ["Make it 3D", "The y-axis must start at zero", "Use a different color for every bar", "Always make the bars horizontal"],
                answerIndex: 1
              },
              {
                question: "Which chart is almost exclusively used for showing how a variable changes over time?",
                options: ["Pie Chart", "Line chart", "Histogram", "Scatter plot"],
                answerIndex: 1
              },
              {
                question: "What is the primary purpose of a histogram?",
                options: ["To compare categorical data", "To show the distribution of a single continuous variable", "To show relationships between two variables", "To display geographic data"],
                answerIndex: 1
              },
              {
                question: "When should you use a pie or donut chart?",
                options: ["When showing trends over time", "When you have a very large number of categories", "When showing parts of a whole with a small number of categories", "When comparing two continuous variables"],
                answerIndex: 2
              }
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 5",
      objective: "Data Visualization Design Principles",
      tutorial: "Tutorial 5: Designing Effective Charts",
      labTitle: "Lab 5: Design Principles",
      experiments: [
        {
          id: "dvf-m5-1",
          title: "Data Visualization Design Principles",
          desc: "Learn best practices for creating clear, accurate, and impactful visualizations.",
          expected: "Able to critique visualizations and improve them using established design principles.",
          code: `# Applying design principles: Improving a bad chart
import matplotlib.pyplot as plt

# Bad Chart Example (Hard to read, unnecessary ink)
plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
bars = plt.bar(['A', 'B', 'C'], [10, 15, 7], color=['red', 'green', 'blue'], edgecolor='black', linewidth=2)
plt.title("BAD: Too much ink, distracting colors")
plt.grid(True, color='gray', linestyle='-', linewidth=1)

# Good Chart Example (High Data-to-Ink ratio, clear)
plt.subplot(1, 2, 2)
plt.bar(['A', 'B', 'C'], [10, 15, 7], color='#4C72B0')
plt.title("GOOD: Clean, focused on data")
# Removing unnecessary borders (spines)
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "Apply fundamental design principles to make your charts not just technically correct, but effectively communicative. We will focus on clarity, accuracy, and the data-to-ink ratio.",
              bullets: [
                "Understand the Data-to-Ink Ratio",
                "Learn to avoid Chartjunk",
                "Understand the responsible use of color"
              ]
            },
            theory: [
              {
                title: "Data-to-Ink Ratio",
                body: [
                  "Coined by Edward Tufte, this principle states that you should maximize the amount of ink used to present data, and minimize ink used for non-data elements.",
                  "Remove heavy grid lines, unnecessary borders, and background colors. Let the data stand out."
                ]
              },
              {
                title: "Avoiding Chartjunk",
                body: [
                  "Chartjunk refers to all visual elements in charts and graphs that are not necessary to comprehend the information.",
                  "This includes 3D effects on 2D charts, unnecessary pictures, and excessive ornamentation. 3D effects, in particular, distort the data and make it harder to read accurately."
                ]
              },
              {
                title: "Purposeful Color",
                body: [
                  "Color should be used to convey information, not just for decoration.",
                  "If all bars in a bar chart represent the same metric, they should generally be the same color. Use a contrasting color only to highlight a specific point of interest.",
                  "Consider colorblindness: avoid relying solely on red/green distinctions."
                ]
              },
              {
                title: "Good vs. Bad Design",
                body: [
                  "![Design Principles](/dataviz_design_principles.png)"
                ]
              }
            ],
            procedure: [
              "Create your initial chart.",
              "Review every element on the screen: axes, grids, borders, legends, colors.",
              "Ask: 'Does this element add information, or is it just decoration?'",
              "Remove any element that does not directly help the reader understand the data.",
              "Ensure colors are used consistently and thoughtfully.",
              "Check that labels and titles provide sufficient context without cluttering the view."
            ],
            pretest: [
              {
                question: "What is 'Chartjunk'?",
                options: ["A special type of graph", "Data that is incorrect", "Unnecessary visual elements that distract from the data", "A tool used for data cleaning"],
                answerIndex: 2
              }
            ],
            posttest: [
              {
                question: "According to the principle of maximizing the Data-to-Ink ratio, what should you do?",
                options: ["Make all lines thicker", "Add background images to charts", "Remove unnecessary gridlines and borders", "Always use 3D bar charts"],
                answerIndex: 2
              },
              {
                question: "Why should you generally avoid 3D effects on standard bar or pie charts?",
                options: ["They are too hard to program", "They visually distort the data and make it harder to read accurately", "They use too much computer memory", "They are only allowed for financial data"],
                answerIndex: 1
              },
              {
                question: "What is 'Chartjunk'?",
                options: ["A special type of graph", "Data that is incorrect", "Unnecessary visual elements that distract from the data", "A tool used for data cleaning"],
                answerIndex: 2
              },
              {
                question: "When applying purposeful color in a bar chart, what is the best practice?",
                options: ["Use a different color for every bar to make it colorful", "Use a single color for all bars unless highlighting a specific point", "Only use red and green to show good and bad", "Always use a dark background"],
                answerIndex: 1
              },
              {
                question: "How does removing unnecessary gridlines improve a chart?",
                options: ["It increases the file size", "It reduces the data-to-ink ratio", "It lets the data stand out and reduces visual clutter", "It makes the chart look older"],
                answerIndex: 2
              }
            ]
          }
        }
      ]
    }
  ]
};
