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
          { question: "What does NumPy stand for?", options: ["Number Python", "Numerical Python", "Numb Python", "Nominal Python"], answerIndex: 1, hint: "It is a library for numerical computations." },
          { question: "What is the standard alias used to import the Pandas library?", options: ["pan", "pnd", "pd", "ps"], answerIndex: 2, hint: "It is a short two-letter alias." },
          { question: "How do you create a NumPy array from a list?", options: ["np.list([1, 2])", "np.array([1, 2])", "np.create([1, 2])", "np.vector([1, 2])"], answerIndex: 1, hint: "Use the array constructor in NumPy." },
          { question: "Which Pandas object represents a 2D table of data?", options: ["Series", "DataFrame", "Panel", "DataSheet"], answerIndex: 1, hint: "It is a frame containing rows and columns of data." },
          { question: "Why are NumPy arrays faster than Python lists?", options: ["They use less syntax", "They store elements in contiguous memory and enforce a single data type", "They run on the GPU", "None of these"], answerIndex: 1, hint: "Contiguous memory layout allows highly optimized C-based loops under the hood." }
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
          { question: "What is the output of: np.array([1, 2]) * 2?", options: ["ndarray: [1, 2, 1, 2]", "ndarray: [2, 4]", "ndarray: [2, 2]", "Error"], answerIndex: 1, hint: "NumPy arrays perform element-wise arithmetic, unlike lists which repeat." },
          { question: "Which method is used to view the first few rows of a Pandas DataFrame?", options: ["tail()", "head()", "top()", "first()"], answerIndex: 1, hint: "It returns the first N rows (default is 5) of the DataFrame." },
          { question: "Which NumPy function is used to create an array with a range of numbers?", options: ["np.range()", "np.arange()", "np.sequence()", "np.interval()"], answerIndex: 1, hint: "It is similar to Python's built-in range, but with an 'a' prepended for array." },
          { question: "How can you select a single column named 'Price' from a DataFrame df?", options: ["df['Price']", "df.Price", "Both df['Price'] and df.Price", "df.get_column('Price')"], answerIndex: 2, hint: "Both bracket notation and dot attribute access are valid in Pandas." },
          { question: "What does shape attribute of a NumPy array return?", options: ["Total number of elements", "A tuple of array dimensions", "The data type of array elements", "The size in bytes of the array"], answerIndex: 1, hint: "For a 2D array of 3 rows and 4 columns, it returns (3, 4)." }
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
