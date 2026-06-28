import type { Week } from "./course-data";

export const pythonExercise14: Week = {
  title: "EXERCISE 14",
  objective: "Introduction to data analysis libraries: NumPy (for array computations) and Pandas (for tabular data manipulation).",
  tutorial: "Tutorial 14: Python Libraries (NumPy and Pandas)",
  labTitle: "Lab 14: Python Libraries (NumPy and Pandas)",
  experiments: [
    {
      id: "py-e14-1",
      title: "Working with NumPy and Pandas",
      desc: "Write a Python program to create a 1D/2D NumPy array, perform basic element-wise operations, and create a Pandas DataFrame to perform data filtering and statistical summaries.",
      expected: "Array: [10 20 30]\nMean: 20.0\nDataFrame:\n    Name  Age  Score\n0  Alice   20     90\n1    Bob   21     85\nFiltered (Age > 20):\n  Name  Age  Score\n1  Bob   21     85",
      content: {
        aim: {
          text: "In this experiment the student will learn to use NumPy and Pandas, the fundamental libraries for numerical computing and data science in Python. The student will perform array operations, create tabular data frames, filter rows based on conditions, and calculate descriptive statistics.",
          bullets: [
            "Import numpy as np and pandas as pd standard aliases",
            "Create and manipulate NumPy 1D and 2D arrays, performing element-wise arithmetic operations",
            "Calculate basic numerical metrics like mean, median, sum, and standard deviation using NumPy methods",
            "Create Pandas DataFrames from dictionaries of lists",
            "Access, filter, and slice DataFrame columns and rows, and run dataframe.describe() for summaries"
          ]
        },
        theory: [
          {
            title: "NumPy (Numerical Python)",
            body: [
              "NumPy is the core library for scientific computing in Python. It provides a high-performance multidimensional array object, ndarray, and tools for working with these arrays.",
              "Unlike Python lists, NumPy arrays contain elements of the same type, making operations much faster and memory-efficient.",
              "Creating arrays: np.array([1, 2, 3])",
              "Common operations: np.mean(arr), np.sum(arr), arr + 10 (vectorized addition)."
            ]
          },
          {
            title: "Pandas (Data Analysis)",
            body: [
              "Pandas is a library providing high-performance, easy-to-use data structures and data analysis tools.",
              "The primary data structures are:",
              "1. Series: A one-dimensional labeled array capable of holding any data type.",
              "2. DataFrame: A two-dimensional labeled data structure with columns of potentially different types (similar to a spreadsheet or SQL table)."
            ]
          },
          {
            title: "DataFrame Operations",
            body: [
              "Creating a DataFrame from a dictionary: df = pd.DataFrame(data_dict)",
              "Filtering data: df[df['Age'] > 20] filters rows where the 'Age' column is greater than 20.",
              "Summary statistics: df.describe() prints a summary of statistics (mean, count, std, min, max) for numeric columns."
            ]
          }
        ],
        pretest: [
            { question: "What does NumPy stand for?", options: ["Numerical Python", "Number Programming", "Numeric Package", "New Python"], answerIndex: 0 },
            { question: "What is the primary purpose of NumPy?", options: ["Web development", "Scientific computing and numerical operations", "File handling", "Game development"], answerIndex: 1 },
            { question: "Which object is the core data structure in NumPy?", options: ["DataFrame", "Series", "ndarray", "Dictionary"], answerIndex: 2 },
            { question: "Which statement creates a NumPy array?", options: ["Correct", "Syntax Error", "Runtime Error", "Logical Error"], answerIndex: 0 },
            { question: "Compared to Python lists, NumPy arrays are:", options: ["Slower", "Less memory efficient", "Faster and more memory efficient", "Identical"], answerIndex: 2 },
            { question: "NumPy arrays usually contain:", options: ["Elements of the same type", "Only strings", "Mixed data types only", "Dictionaries"], answerIndex: 0 },
            { question: "Which function calculates the mean of array elements?", options: ["np.avg()", "np.mean()", "np.average_value()", "np.mid()"], answerIndex: 1 },
            { question: "Which function calculates the sum of array elements?", options: ["np.total()", "np.addall()", "np.sum()", "np.count()"], answerIndex: 2 },
            { question: "What is vectorized addition?", options: ["Adds 10 to every element", "Appends 10 to array", "Multiplies elements by 10", "Causes an error"], answerIndex: 0 },
            { question: "What is the output?", options: ["[1,2,3,2]", "[3,4,5]", "[2,4,6]", "Error"], answerIndex: 1 },
            { question: "Which library is commonly used for data analysis in Python?", options: ["random", "math", "pandas", "os"], answerIndex: 2 },
            { question: "What is the primary purpose of Pandas?", options: ["Graphics design", "Data analysis and manipulation", "Web hosting", "Networking"], answerIndex: 1 },
            { question: "Which are the two primary data structures in Pandas?", options: ["Array and List", "Series and DataFrame", "Set and Dictionary", "Queue and Stack"], answerIndex: 1 },
            { question: "What is a Series in Pandas?", options: ["Two-dimensional table", "One-dimensional labeled array", "NumPy array only", "Collection of modules"], answerIndex: 1 },
            { question: "What is a DataFrame?", options: ["One-dimensional array", "Dictionary", "Two-dimensional labeled data structure", "Set of functions"], answerIndex: 2 },
          ],
        procedure: [
          "Read the Aim and Theory to understand NumPy arrays, Pandas DataFrames, and statistical metrics",
          "Note the standard import statements for numpy and pandas",
          "Observe how element-wise math and boolean indexing operate on arrays/dataframes",
          "Go to Simulation tab and click Start",
          "Step through the NumPy and Pandas library simulation using Next",
          "Observe how the array is printed and how DataFrame rows are filtered",
          "Check memory structures in the Memory State panel",
          "Go to Code Test tab and run the script",
          "Verify the outputs of NumPy array mean and Pandas filtered DataFrame match the expected output",
          "Modify the script to add a new column 'Grade' to the DataFrame with value 'Pass' for all rows",
          "Calculate the maximum value in a NumPy array using np.max(arr)",
          "Perform double condition filtering on a DataFrame: df[(df['Age'] >= 20) & (df['Score'] > 85)]",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# NumPy and Pandas Simulation\n# Mocking basic operations for step-by-step trace\nimport numpy as np\nimport pandas as pd\n\narr = np.array([10, 20, 30])\narr_mean = arr.mean()\n\ndata = {'Name': ['Alice', 'Bob'], 'Age': [20, 21], 'Score': [90, 85]}\ndf = pd.DataFrame(data)\ndf_filtered = df[df['Age'] > 20]\n\nprint('Array:', arr)\nprint('Mean:', arr_mean)",
          steps: [
            { line: 3, annotation: "import numpy as np — imports library as alias np", memory: [{ variable: "np", type: "module", value: "<module 'numpy'>" }], output: "" },
            { line: 4, annotation: "import pandas as pd — imports library as alias pd", memory: [{ variable: "pd", type: "module", value: "<module 'pandas'>" }], output: "" },
            { line: 6, annotation: "arr = np.array([10, 20, 30]) — creates a 1D numpy array", memory: [{ variable: "arr", type: "ndarray", value: "[10, 20, 30]" }], output: "" },
            { line: 7, annotation: "arr_mean = arr.mean() = (10+20+30)/3 = 20.0", memory: [{ variable: "arr_mean", type: "float", value: "20.0" }], output: "" },
            { line: 9, annotation: "data = {...} — defines raw dictionary for DataFrame", memory: [], output: "" },
            { line: 10, annotation: "df = pd.DataFrame(data) — creates 2D DataFrame", memory: [{ variable: "df", type: "DataFrame", value: "columns: Name, Age, Score" }], output: "" },
            { line: 11, annotation: "df_filtered = df[df['Age'] > 20] — filters out Alice (Age=20), leaving Bob (Age=21)", memory: [{ variable: "df_filtered", type: "DataFrame", value: "rows: 1 (Bob)" }], output: "" },
            { line: 13, annotation: "print('Array:', arr) displays the array", memory: [], output: "Array: [10 20 30]\n" },
            { line: 14, annotation: "print('Mean:', arr_mean) displays average", memory: [], output: "Array: [10 20 30]\nMean: 20.0\n" }
          ]
        },
        posttest: [
            { question: "Which statement creates a DataFrame?", options: ["Correct", "Syntax Error", "Runtime Error", "Logical Error"], answerIndex: 0 },
            { question: "A DataFrame is similar to:", options: ["A text file", "A spreadsheet or SQL table", "A loop", "A package"], answerIndex: 1 },
            { question: "Which Pandas structure can contain columns of different data types?", options: ["List", "Series", "DataFrame", "Tuple"], answerIndex: 2 },
            { question: "What does the following filter do?", options: ["Deletes rows", "Selects rows where Age > 20", "Sorts rows", "Counts rows"], answerIndex: 1 },
            { question: "Which column is being filtered in the previous example?", options: ["Name", "Marks", "Age", "Salary"], answerIndex: 2 },
            { question: "What does df.describe() provide?", options: ["File information", "Summary statistics", "Column deletion", "Data sorting"], answerIndex: 1 },
            { question: "Which statistics may be included in df.describe()?", options: ["Mean", "Count", "Min and Max", "All of the above"], answerIndex: 3 },
            { question: "What is the output of:", options: ["6", "8", "12", "24"], answerIndex: 2 },
            { question: "What is the output of:", options: ["20.0", "30.0", "10.0", "60.0"], answerIndex: 0 },
            { question: "Which statement about NumPy arrays is TRUE?", options: ["They are slower than Python lists", "They support efficient numerical operations", "They cannot store numbers", "They are always two-dimensional"], answerIndex: 1 },
            { question: "Which statement about Pandas is TRUE?", options: ["It is mainly used for machine hardware control", "It provides tools for structured data analysis", "It replaces Python completely", "It cannot work with NumPy"], answerIndex: 1 },
            { question: "Which library is commonly imported as np?", options: ["Pandas", "NumPy", "Random", "Math"], answerIndex: 1 },
            { question: "Which library is commonly imported as pd?", options: ["NumPy", "Random", "Pandas", "Math"], answerIndex: 2 },
            { question: "Which combination is correct?", options: ["NumPy \u2192 Numerical Computing, Pandas \u2192 Data Analysis", "NumPy \u2192 Web Development, Pandas \u2192 Networking", "NumPy \u2192 File Handling, Pandas \u2192 Loops", "NumPy \u2192 Packages, Pandas \u2192 Modules"], answerIndex: 0 },
            { question: "Why are NumPy and Pandas widely used together?", options: ["They provide efficient numerical computation and powerful data analysis tools", "They replace Python syntax", "They are used only for file operations", "They prevent object-oriented programming"], answerIndex: 0 },
          ],
        references: [
          "NumPy User Guide: https://numpy.org/doc/stable/user/index.html",
          "Pandas Documentation: https://pandas.pydata.org/docs/",
          "McKinney W., Python for Data Analysis, 2nd Edition, O'Reilly Media"
        ]
      }
    }
  ]
};
