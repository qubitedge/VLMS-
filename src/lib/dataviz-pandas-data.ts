// src/lib/dataviz-pandas-data.ts

import { Course } from './course-data';
import { datavizPandasShortNotes } from './dataviz-pandas-short-notes';

export const datavizPandasCourse: Course = {
  id: "data-visualization-with-pandas",
  title: "Data Visualization with Pandas",
  shortNotes: datavizPandasShortNotes,
  objectives: [
    "To master basic and advanced plotting capabilities built directly into Pandas DataFrames and Series.",
    "To create high-impact line charts, bar plots, histograms, box plots, scatter plots, and area charts using df.plot().",
    "To visualize multi-variable relationships using secondary axes, grouping, subplots, and colormaps.",
    "To perform exploratory data analysis (EDA) using statistical plots like KDE, hexbin, and boxplots.",
    "To customize plot aesthetic elements including gridlines, legends, annotations, axis ticks, and figure sizes.",
    "To handle time-series data visualization including rolling averages, resampling, and date formatting."
  ],
  introduction: [
    "Pandas is widely recognized as the standard data manipulation library in Python. Beyond data cleaning and transformations, Pandas provides a seamlessly integrated visualization API built directly on top of Matplotlib. This enables data analysts and data scientists to create expressive graphics with minimal code, pulling labels, indices, and legend titles automatically from DataFrame metadata.",
    "This course guides students step-by-step through the visualization ecosystem of Pandas. Beginning with basic line and bar charts, learners progress through statistical distributions, categorical comparisons, multi-variable scatter plots, time-series visualizations, and complex multi-plot subplots grids. By completing this hands-on laboratory, students gain full proficiency in transforming raw tabular data into intuitive, publication-ready visual insights."
  ],
  targetAudience: {
    primary: "Data Analysts, Data Scientists, and Software Engineers seeking efficient, high-level data visualization techniques in Python.",
    prerequisites: [
      "Basic Python programming knowledge",
      "Understanding of Pandas DataFrames, Series, and Indexing",
      "Familiarity with Python execution environments (Jupyter Notebooks)"
    ],
    usefulFor: [
      "Data Analysts conducting rapid Exploratory Data Analysis (EDA)",
      "Financial Analysts plotting time-series stock and economic metrics",
      "Engineers building data processing pipelines with integrated visual checks"
    ]
  },
  alignment: {
    university: "Virtual Lab",
    department: "Data Science & Visualization",
    course: "Data Visualization with Pandas",
    credits: "L:0 T:0 P:2 C:1",
    yearSem: "Elective",
    branches: "Computer Science, AI & DS, Data Science, Information Technology",
    totalExperiments: "10",
    compiler: "Python 3, Pandas, Matplotlib, Pyodide",
    units: [
      { unit: "Module 1", topics: "Line, Bar & Categorical Visualizations", weeks: "Week 1-2" },
      { unit: "Module 2", topics: "Distribution Analysis (Histograms, KDE & Boxplots)", weeks: "Week 3-4" },
      { unit: "Module 3", topics: "Bivariate & Cumulative Visualizations (Scatter, Hexbin & Area)", weeks: "Week 5-6" },
      { unit: "Module 4", topics: "Multi-Plot Subplots, Custom Styling & Time Series", weeks: "Week 7-8" }
    ]
  },
  weeks: [
    {
      title: "Module 1: Line, Bar & Categorical Visualizations",
      objective: "Master basic line plots, vertical and horizontal bar charts, and stacked categorical visualizations directly from Pandas DataFrames.",
      tutorial: "Tutorial 1: Pandas .plot() Basics",
      labTitle: "Lab 1: Line and Bar Chart Fundamentals",
      experiments: [
        {
          id: "dv-pd-e1",
          title: "Basic Line & Stacked Bar Plots with Pandas",
          desc: "Learn how to use df.plot() to create single and multi-line trends and stacked bar charts for categorical sales data.",
          expected: "A figure displaying monthly sales revenue as line plots alongside stacked bar charts comparing product categories.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate quarterly revenue data
data = {
    'Quarter': ['Q1', 'Q2', 'Q3', 'Q4'],
    'Hardware': [45000, 52000, 48000, 61000],
    'Software': [28000, 34000, 39000, 47000],
    'Services': [15000, 18000, 22000, 26000]
}
df = pd.DataFrame(data).set_index('Quarter')

# 1. Line plot showing trends over quarters
plt.figure(figsize=(8, 4))
df.plot(kind='line', marker='o', linewidth=2, grid=True, title="Quarterly Revenue Trends")
plt.ylabel("Revenue ($)")
plt.show()

# 2. Stacked Bar Chart
df.plot(kind='bar', stacked=True, colormap='teal', figsize=(8, 4), title="Stacked Revenue Composition")
plt.ylabel("Total Revenue ($)")
plt.xlabel("Quarter")
plt.legend(title="Department")
plt.show()`,
          content: {
            aim: {
              text: "To master creating basic line plots and stacked bar charts directly from Pandas DataFrames using df.plot().",
              bullets: [
                "Understand how Pandas maps DataFrame indices to the X-axis and columns to line traces.",
                "Learn how to create stacked bar charts using stacked=True.",
                "Apply custom figure titles, axis labels, and colormaps."
              ]
            },
            theory: [
              {
                title: "Pandas df.plot() Architecture",
                body: [
                  "Pandas provides a unified plotting interface called df.plot(). Under the hood, Pandas calls Matplotlib functions while using DataFrame metadata to automatically set legend labels, tick marks, and axis titles.",
                  "When calling df.plot(kind='line'), each column in the DataFrame is rendered as a separate line series. The index of the DataFrame serves as the X-axis tick labels.",
                  "![Pandas Line and Bar Plots](/pandas_line_bar.png)",
                  "Setting stacked=True in df.plot(kind='bar') stacks categorical column values on top of each other, allowing intuitive component-to-total visual analysis."
                ]
              }
            ],
            procedure: [
              "Step 1: Import pandas, numpy, and matplotlib.pyplot.",
              "Step 2: Construct a Pandas DataFrame with categorical index (Quarters) and numeric revenue columns.",
              "Step 3: Call df.plot(kind='line', marker='o', grid=True) to render line chart.",
              "Step 4: Label y-axis using plt.ylabel('Revenue ($)').",
              "Step 5: Call df.plot(kind='bar', stacked=True) to display total revenue breakdown.",
              "Step 6: Render and verify figures using plt.show()."
            ],
            pretest: [
              { question: "Which underlying Python library powers Pandas plotting functions?", options: ["Seaborn", "Matplotlib", "Plotly", "Bokeh"], answerIndex: 1 },
              { question: "What does Pandas automatically use as the X-axis for df.plot() by default?", options: ["First column", "DataFrame Index", "Column names", "Row count"], answerIndex: 1 },
              { question: "Which parameter in df.plot() creates a stacked bar chart?", options: ["accumulate=True", "stacked=True", "group='stacked'", "mode='stack'"], answerIndex: 1 },
              { question: "How do you specify the type of plot in df.plot()?", options: ["type='bar'", "chart='line'", "kind='line'", "style='plot'"], answerIndex: 2 },
              { question: "Which method clears or displays the current Matplotlib figure buffer?", options: ["df.render()", "plt.show()", "df.display()", "plt.flush()"], answerIndex: 1 }
            ],
            posttest: [
              { question: "If a DataFrame has 4 numeric columns, how many lines will df.plot(kind='line') draw?", options: ["1 line", "4 lines", "None", "Depends on rows"], answerIndex: 1 },
              { question: "What happens if DataFrame index is non-numeric (e.g. Strings 'Q1', 'Q2')?", options: ["Error occurs", "Index strings are used as categorical X-axis labels", "X-axis is hidden", "Plots numbers instead"], answerIndex: 1 },
              { question: "Which parameter controls line thickness in df.plot()?", options: ["size", "linewidth (or lw)", "weight", "thickness"], answerIndex: 1 },
              { question: "How can you change the color palette of a stacked bar chart in Pandas?", options: ["palette='color'", "colormap='name'", "colors=['a','b']", "theme='name'"], answerIndex: 1 },
              { question: "What does grid=True do in df.plot()?", options: ["Splits into subplots", "Adds gridlines to the background axes", "Creates a matrix table", "Groups data"], answerIndex: 1 }
            ]
          }
        },
        {
          id: "dv-pd-e2",
          title: "Horizontal Bar Charts & Value Counts Visualization",
          desc: "Visualize categorical frequency distributions and long text labels using horizontal bar charts (kind='barh') and Series.value_counts().",
          expected: "A clear horizontal bar chart displaying category frequency rankings sorted in ascending order.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate customer support ticket data
np.random.seed(42)
categories = ['Billing Issue', 'Login Failure', 'Password Reset', 'Feature Request', 'Bug Report', 'Account Cancellation']
data = np.random.choice(categories, size=500, p=[0.25, 0.20, 0.30, 0.10, 0.10, 0.05])
df_tickets = pd.DataFrame({'Category': data})

# Calculate frequency counts and sort
counts = df_tickets['Category'].value_counts(ascending=True)

# Plot horizontal bar chart
plt.figure(figsize=(9, 5))
counts.plot(kind='barh', color='skyblue', edgecolor='navy')
plt.title("Support Ticket Distribution by Category")
plt.xlabel("Number of Tickets")
plt.ylabel("Ticket Category")
plt.grid(axis='x', linestyle=':', alpha=0.7)
plt.show()`,
          content: {
            aim: {
              text: "To visualize categorical frequency distributions using Series.value_counts() and horizontal bar charts (kind='barh').",
              bullets: [
                "Understand why horizontal bar charts are preferred for long categorical text labels.",
                "Utilize value_counts(ascending=True) to rank items cleanly from bottom to top.",
                "Apply edge colors and grid axis constraints for improved clarity."
              ]
            },
            theory: [
              {
                title: "Horizontal Bar Charts (kind='barh')",
                body: [
                  "Vertical bar charts often cause overlapping x-axis labels when category names are long sentences or complex terms.",
                  "Horizontal bar charts (kind='barh') solve this by placing categories on the Y-axis, providing ample horizontal space for long text descriptions without tilting text.",
                  "Sorting value counts with `ascending=True` ensures the most frequent category appears at the very top of the chart."
                ]
              }
            ],
            procedure: [
              "Step 1: Create a Series of categorical text entries.",
              "Step 2: Apply .value_counts(ascending=True) to compute counts sorted for horizontal rendering.",
              "Step 3: Call .plot(kind='barh', color='skyblue', edgecolor='navy').",
              "Step 4: Set X-axis label to 'Number of Tickets' and Y-axis label to 'Category'.",
              "Step 5: Add vertical grid lines using plt.grid(axis='x') and render plot."
            ],
            pretest: [
              { question: "Which plot kind generates horizontal bars in Pandas?", options: ["'hbar'", "'barh'", "'horizontal'", "'side_bar'"], answerIndex: 1 },
              { question: "What is the primary advantage of horizontal bar charts over vertical bar charts?", options: ["Faster rendering", "Easier reading of long category labels", "Uses less memory", "Supports 3D"], answerIndex: 1 },
              { question: "Which Pandas Series method computes frequencies of unique values?", options: ["df.count_unique()", "Series.value_counts()", "Series.frequency()", "df.group_count()"], answerIndex: 1 },
              { question: "Why is ascending=True useful when plotting barh for sorted value_counts?", options: ["Hides low values", "Puts highest frequency category at top", "Reverses text", "Removes zero counts"], answerIndex: 1 },
              { question: "What does grid(axis='x') do?", options: ["Draws horizontal lines only", "Draws vertical gridlines aligned with X-axis ticks", "Grid around figure border", "Hides grid"], answerIndex: 1 }
            ],
            posttest: [
              { question: "In a barh plot, which axis holds the numerical values?", options: ["Y-axis", "X-axis", "Z-axis", "Both X and Y"], answerIndex: 1 },
              { question: "What attribute adds a border color around individual bars in Pandas?", options: ["border='black'", "edgecolor='navy'", "outline='blue'", "line_color='red'"], answerIndex: 1 },
              { question: "If value_counts() is not sorted, how will bars be ordered in plot?", options: ["Alphabetically", "In order of appearance / frequency default", "Randomly", "By label length"], answerIndex: 1 },
              { question: "Can value_counts() normalize outputs to show proportions (0 to 1)?", options: ["No", "Yes, with normalize=True", "Only with Seaborn", "Requires custom loop"], answerIndex: 1 },
              { question: "Which argument sets the figure dimension in inches?", options: ["dimension=(w,h)", "figsize=(width, height)", "dpi=(w,h)", "area=(w,h)"], answerIndex: 1 }
            ]
          }
        }
      ]
    },
    {
      title: "Module 2: Distribution Analysis (Histograms, KDE & Boxplots)",
      objective: "Analyze frequency distributions, probability density shapes, quartiles, and statistical outliers using Pandas hist, kde, and boxplot tools.",
      tutorial: "Tutorial 2: Statistical Plotting in Pandas",
      labTitle: "Lab 2: Histograms, Density Plots & Boxplots",
      experiments: [
        {
          id: "dv-pd-e3",
          title: "Histograms & Density Estimation (KDE) with Pandas",
          desc: "Compare frequency distributions using histograms and smooth Kernel Density Estimation (KDE) plots in Pandas.",
          expected: "Superimposed and side-by-side plots displaying continuous distribution shapes and smoothed probability density estimates.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate multi-modal continuous dataset
np.random.seed(42)
g1 = np.random.normal(loc=50, scale=10, size=500)
g2 = np.random.normal(loc=80, scale=15, size=500)
df_dist = pd.DataFrame({'Group_A': g1, 'Group_B': g2})

# 1. Overlaid Histogram
plt.figure(figsize=(8, 4))
df_dist.plot.hist(bins=25, alpha=0.6, grid=True, title="Overlaid Group Histograms")
plt.xlabel("Exam Scores")
plt.ylabel("Frequency")
plt.show()

# 2. Kernel Density Estimate (KDE) Plot
plt.figure(figsize=(8, 4))
df_dist.plot.kde(linewidth=2.5, title="Smooth Kernel Density Estimation (KDE)")
plt.xlabel("Exam Scores")
plt.ylabel("Density")
plt.grid(True, linestyle='--')
plt.show()`,
          content: {
            aim: {
              text: "To understand and implement histograms and Kernel Density Estimation (KDE) plots in Pandas for continuous data distributions.",
              bullets: [
                "Learn how `bins` and `alpha` parameters affect histogram readability.",
                "Generate smooth KDE probability density curves using df.plot.kde().",
                "Compare multi-column continuous distributions on a single axis."
              ]
            },
            theory: [
              {
                title: "Histograms vs Kernel Density Estimation (KDE)",
                body: [
                  "A histogram divides continuous numerical data into discrete intervals (bins) and counts how many observations fall into each bin.",
                  "KDE (Kernel Density Estimation) produces a smooth continuous curve estimating the underlying probability density function without binning artifacts.",
                  "![Pandas Distribution Plots](/pandas_histogram_kde.png)",
                  "Setting alpha<1.0 makes bars semi-transparent, permitting comparison of overlapping distributions."
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame with continuous numeric columns.",
              "Step 2: Call df.plot.hist(bins=25, alpha=0.6) to render overlapping histograms.",
              "Step 3: Label axes and display histogram.",
              "Step 4: Call df.plot.kde(linewidth=2.5) to render smoothed density curves.",
              "Step 5: Verify distribution shapes and multi-modal peaks."
            ],
            pretest: [
              { question: "What does the `bins` argument specify in a histogram?", options: ["Number of columns", "Number of discrete interval buckets", "Bar thickness", "Total data points"], answerIndex: 1 },
              { question: "What does KDE stand for in statistics?", options: ["Kernel Density Estimation", "Key Data Evaluation", "K-means Density Error", "Known Distribution Entry"], answerIndex: 0 },
              { question: "What does setting alpha=0.5 do in a plot?", options: ["Halves bar height", "Makes plot semi-transparent (50% opacity)", "Zooms in 50%", "Splits data in half"], answerIndex: 1 },
              { question: "Which method direct call in Pandas creates a KDE plot?", options: ["df.plot.smooth()", "df.plot.kde()", "df.plot.density_curve()", "df.plot.pdf()"], answerIndex: 1 },
              { question: "Can df.plot.hist() take cumulative=True?", options: ["No", "Yes, to plot cumulative frequencies", "Only in Seaborn", "Causes error"], answerIndex: 1 }
            ],
            posttest: [
              { question: "Why is alpha essential when plotting multiple histograms on the same axes?", options: ["To prevent memory overflow", "To see overlapping bars behind each other", "To increase font size", "To smooth bars"], answerIndex: 1 },
              { question: "In a KDE plot, what does the area under the curve integrate to?", options: ["100", "1.0", "Mean of data", "Total count"], answerIndex: 1 },
              { question: "If bins parameter is set too low (e.g., bins=2), what happens?", options: ["Overfitting", "Loss of distribution details (underfitting/oversimplification)", "Plot crashes", "Turns into pie chart"], answerIndex: 1 },
              { question: "Which parameter controls curve smoothness band-width in df.plot.kde()?", options: ["bw_method", "bins", "smooth_val", "kernel_width"], answerIndex: 0 },
              { question: "What is the y-axis label for a standard density plot?", options: ["Frequency count", "Probability Density", "Total Percentage", "Bin width"], answerIndex: 1 }
            ]
          }
        },
        {
          id: "dv-pd-e4",
          title: "Box Plots & Outlier Analysis with Pandas",
          desc: "Create boxplots using df.boxplot() and df.plot.box() to examine medians, interquartile ranges (IQR), and statistical outliers across categories.",
          expected: "A box-and-whisker plot highlighting medians, quartiles Q1/Q3, whiskers, and individual outlier points.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate skewed salary data across departments
np.random.seed(101)
departments = ['Engineering', 'Marketing', 'Sales', 'HR']
data = []
for dept in departments:
    salaries = np.random.normal(loc=60000 if dept!='Engineering' else 90000, scale=15000, size=100)
    # Inject outliers
    salaries = np.append(salaries, [160000, 175000, 20000] if dept=='Engineering' else [130000])
    for s in salaries:
        data.append({'Department': dept, 'Salary': s})

df_salaries = pd.DataFrame(data)

# Grouped Boxplot using pandas .boxplot()
plt.figure(figsize=(9, 5))
df_salaries.boxplot(column='Salary', by='Department', grid=False, patch_artist=True)
plt.suptitle("") # Remove default title
plt.title("Salary Distribution & Outliers by Department")
plt.ylabel("Annual Salary ($)")
plt.show()`,
          content: {
            aim: {
              text: "To perform outlier analysis and quartile comparisons using Pandas boxplots.",
              bullets: [
                "Understand the five-number summary: Min, Q1 (25%), Median (Q2 50%), Q3 (75%), and Max.",
                "Identify outliers defined as points beyond 1.5 * IQR from quartiles.",
                "Use `df.boxplot(column=..., by=...)` for grouped categorical analysis."
              ]
            },
            theory: [
              {
                title: "Anatomy of a Box Plot",
                body: [
                  "A box plot (box-and-whisker plot) summarizes continuous data distributions visually.",
                  "The box encapsulates the Interquartile Range (IQR = Q3 - Q1), with a line marking the median.",
                  "Whiskers extend to 1.5 * IQR. Points beyond whiskers are plotted as individual flier dots (outliers).",
                  "![Pandas Boxplot and Area Plot](/pandas_boxplot_area.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame with categorical and numeric variables.",
              "Step 2: Call `df.boxplot(column='Salary', by='Department')`.",
              "Step 3: Suppress default automatic super-title using `plt.suptitle('')`.",
              "Step 4: Set custom title and Y-axis label.",
              "Step 5: Inspect median lines, IQR boxes, and outlier points."
            ],
            pretest: [
              { question: "What does the line inside a box plot represent?", options: ["Mean", "Median (50th percentile)", "Mode", "Standard Deviation"], answerIndex: 1 },
              { question: "What is IQR defined as?", options: ["Q3 - Q1", "Max - Min", "Mean / Std", "Q2 - Q1"], answerIndex: 0 },
              { question: "By default, outliers in a boxplot fall beyond how many times IQR from quartiles?", options: ["0.5 * IQR", "1.0 * IQR", "1.5 * IQR", "3.0 * IQR"], answerIndex: 2 },
              { question: "Which parameter in df.boxplot() specifies categorical grouping?", options: ["group", "by", "category", "split"], answerIndex: 1 },
              { question: "What does patch_artist=True do in boxplots?", options: ["Fills boxes with color", "Draws line art", "Hides whiskers", "Enables 3D"], answerIndex: 0 }
            ],
            posttest: [
              { question: "What are the individual points plotted beyond the whiskers called?", options: ["Inliers", "Fliers / Outliers", "Centroids", "Means"], answerIndex: 1 },
              { question: "Can a boxplot be drawn horizontally in Pandas?", options: ["No", "Yes, with vert=False", "Only with Seaborn", "Requires polar axis"], answerIndex: 1 },
              { question: "In df.boxplot(), how do you hide background grid lines?", options: ["show_grid=False", "grid=False", "no_lines=True", "clean=True"], answerIndex: 1 },
              { question: "What portion of data falls inside the box of a boxplot?", options: ["25%", "50%", "75%", "95%"], answerIndex: 1 },
              { question: "Which function removes the automatic 'Boxplot grouped by...' title in Matplotlib?", options: ["plt.remove_title()", "plt.suptitle('')", "plt.no_title()", "df.clean_title()"], answerIndex: 1 }
            ]
          }
        }
      ]
    },
    {
      title: "Module 3: Bivariate & Cumulative Visualizations (Scatter, Hexbin & Area)",
      objective: "Visualize relationships between two or more continuous variables using scatter plots, 2D hexbin density binning, and cumulative area plots.",
      tutorial: "Tutorial 3: Multi-Variable Data Visualization",
      labTitle: "Lab 3: Scatter Plots, Hexbin & Area Charts",
      experiments: [
        {
          id: "dv-pd-e5",
          title: "Bivariate Scatter Plots & Hexbin Density Binning",
          desc: "Map multivariate continuous relationships using scatter plots (with color and size attributes) and hexbin plots for high-density datasets.",
          expected: "Interactive 2D scatter plot with color scale legend and a hexagonal binning plot showing point density clusters.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate 2D continuous data
np.random.seed(42)
n = 1000
x = np.random.normal(100, 15, n)
y = x * 0.8 + np.random.normal(0, 10, n)
z = np.random.uniform(10, 100, n)

df_bivariate = pd.DataFrame({'Ad_Spend': x, 'Sales': y, 'ROI': z})

# 1. Scatter plot with color mapped to ROI
plt.figure(figsize=(8, 5))
df_bivariate.plot.scatter(x='Ad_Spend', y='Sales', c='ROI', cmap='viridis', s=35, title="Ad Spend vs Sales (Color = ROI)")
plt.grid(True, linestyle=':')
plt.show()

# 2. Hexbin Plot for Dense Data
plt.figure(figsize=(8, 5))
df_bivariate.plot.hexbin(x='Ad_Spend', y='Sales', gridsize=20, cmap='plasma', title="2D Hexagonal Binning Density")
plt.show()`,
          content: {
            aim: {
              text: "To explore bivariate continuous relationships using scatter plots and 2D hexagonal binning (hexbin) in Pandas.",
              bullets: [
                "Use `c` parameter to map a 3rd numeric column to marker color scale.",
                "Use `s` parameter to map a 4th numeric column to marker size.",
                "Use `df.plot.hexbin(gridsize=...)` to avoid overplotting in high-density datasets."
              ]
            },
            theory: [
              {
                title: "Scatter Plots vs Hexbin Plots",
                body: [
                  "Scatter plots display individual data points at (x, y) coordinates. Mapping color (`c`) and size (`s`) allows visualizing up to 4 dimensions.",
                  "When datasets contain thousands of overlapping points (overplotting), scatter plots become solid blobs.",
                  "Hexbin plots tessellate the 2D plane into regular hexagons and color each hexagon according to the number of points inside it.",
                  "![Pandas Scatter and Hexbin Plots](/pandas_scatter_hexbin.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame with continuous numerical variables.",
              "Step 2: Call `df.plot.scatter(x='Ad_Spend', y='Sales', c='ROI', cmap='viridis')`.",
              "Step 3: Display scatter plot with colorbar legend.",
              "Step 4: Call `df.plot.hexbin(x='Ad_Spend', y='Sales', gridsize=20, cmap='plasma')`.",
              "Step 5: Verify point density clusters in hexagonal grid."
            ],
            pretest: [
              { question: "Which parameter maps a column to point color in df.plot.scatter()?", options: ["color", "c", "hue", "palette"], answerIndex: 1 },
              { question: "Which parameter maps a column to point size in df.plot.scatter()?", options: ["size", "s", "scale", "radius"], answerIndex: 1 },
              { question: "What problem do hexbin plots solve?", options: ["Missing values", "Overplotting in high-density datasets", "String labels", "Non-linear equations"], answerIndex: 1 },
              { question: "What does gridsize control in hexbin plots?", options: ["Figure width", "Number of hexagonal bins across the grid", "Gridlines opacity", "Axis ticks count"], answerIndex: 1 },
              { question: "Which parameter sets color scale theme in hexbin/scatter?", options: ["cmap", "colors", "theme", "palette"], answerIndex: 0 }
            ],
            posttest: [
              { question: "What shape are the binning cells in a hexbin plot?", options: ["Squares", "Triangles", "Hexagons", "Circles"], answerIndex: 2 },
              { question: "If c argument in scatter plot receives a string column name, what is added automatically?", options: ["Pie chart", "Colorbar scale legend", "Box plot", "Error bar"], answerIndex: 1 },
              { question: "In hexbin plots, what does cell color intensity represent?", options: ["X value", "Y value", "Count / density of points falling inside that hexagon", "Outlier score"], answerIndex: 2 },
              { question: "Can hexbin accept a weight column C to aggregate instead of counts?", options: ["No", "Yes, with parameter C", "Only in Seaborn", "Requires SQL"], answerIndex: 1 },
              { question: "What happens if s parameter in scatter receives a negative value?", options: ["Inverts dot", "Raises ValueError", "Ignores size", "Makes dot invisible"], answerIndex: 1 }
            ]
          }
        },
        {
          id: "dv-pd-e6",
          title: "Cumulative & Stacked Area Plots",
          desc: "Create stacked and unstacked area charts using df.plot.area() to track cumulative metric contributions over time.",
          expected: "An area plot displaying cumulative totals across categories with customizable transparency.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate monthly traffic source data
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
df_traffic = pd.DataFrame({
    'Organic': [12000, 15000, 18000, 22000, 25000, 29000],
    'Direct': [8000, 9500, 11000, 12500, 14000, 16000],
    'Referral': [4000, 5200, 6100, 7500, 8200, 9500],
    'Social': [3000, 4500, 7000, 9500, 12000, 15000]
}, index=months)

# Stacked Area Plot (Default)
plt.figure(figsize=(9, 5))
df_traffic.plot.area(colormap='magma', alpha=0.7, title="Cumulative Web Traffic by Source")
plt.ylabel("Monthly Visitors")
plt.xlabel("Month")
plt.grid(True, linestyle='--', alpha=0.5)
plt.show()

# Unstacked Area Plot
plt.figure(figsize=(9, 5))
df_traffic.plot.area(stacked=False, alpha=0.4, title="Overlapping Non-Stacked Visitor Trends")
plt.ylabel("Monthly Visitors")
plt.show()`,
          content: {
            aim: {
              text: "To visualize cumulative volume trends and component proportions over time using Pandas area plots.",
              bullets: [
                "Use `df.plot.area()` for stacked cumulative volume visual analysis.",
                "Understand the difference between `stacked=True` and `stacked=False`.",
                "Apply transparency (`alpha`) to prevent occluding overlapping unstacked areas."
              ]
            },
            theory: [
              {
                title: "Area Plot Dynamics",
                body: [
                  "Area plots are line charts with the area below the line filled with color.",
                  "By default (`stacked=True`), area plots stack series vertically, showing how individual components sum up to a total volume over time.",
                  "When `stacked=False`, areas overlap. Setting `alpha<0.5` ensures lower series remain visible beneath upper series.",
                  "![Pandas Boxplot and Area Plot](/pandas_boxplot_area.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame with ordered time/index and positive numerical columns.",
              "Step 2: Call `df.plot.area(colormap='magma', alpha=0.7)` for stacked visualization.",
              "Step 3: Label Y-axis and display stacked figure.",
              "Step 4: Call `df.plot.area(stacked=False, alpha=0.4)` for unstacked overlapping view.",
              "Step 5: Verify cumulative vs non-stacked representations."
            ],
            pretest: [
              { question: "What is the default value of `stacked` in `df.plot.area()`?", options: ["False", "True", "None", "Auto"], answerIndex: 1 },
              { question: "What requirement must data satisfy for stacked area plots to render correctly?", options: ["Must be negative", "All values should ideally be non-negative (>=0)", "Must be integers", "Must be sorted"], answerIndex: 1 },
              { question: "What does an area plot represent visually?", options: ["Slopes only", "Filled region under a line plot", "3D surface", "Bar height"], answerIndex: 1 },
              { question: "Why is alpha important in unstacked area plots?", options: ["Speeds up render", "Prevents foreground areas from hiding background areas", "Deletes zeros", "Changes font"], answerIndex: 1 },
              { question: "Which method direct call produces an area plot in Pandas?", options: ["df.plot.fill()", "df.plot.area()", "df.plot.surface()", "df.plot.band()"], answerIndex: 1 }
            ],
            posttest: [
              { question: "In a stacked area plot, what does the top edge of the highest band represent?", options: ["Average of columns", "Total sum of all stacked columns at that X point", "Maximum single column value", "Standard error"], answerIndex: 1 },
              { question: "What happens if data contains negative numbers in a stacked area plot?", options: ["Warning/Unpredictable layout or baseline shifts", "Plot automatically converts to bar chart", "Points are ignored", "Fills outside axis"], answerIndex: 0 },
              { question: "How do you specify custom X-axis column in df.plot.area()?", options: ["index='col'", "x='ColumnName'", "axis_x='col'", "time='col'"], answerIndex: 1 },
              { question: "Can area plots use datetime index directly on X-axis?", options: ["No", "Yes, Pandas handles datetime indexing natively", "Only with Seaborn", "Requires string conversion"], answerIndex: 1 },
              { question: "Which colormap provides high contrast dark-to-light progression suitable for area plots?", options: ["binary", "magma", "Accent", "gray"], answerIndex: 1 }
            ]
          }
        }
      ]
    },
    {
      title: "Module 4: Multi-Plot Subplots, Custom Styling & Time Series",
      objective: "Master multi-axis subplots grids, pie chart compositions, advanced visual styling, and datetime time-series resampling visualizations.",
      tutorial: "Tutorial 4: Advanced Subplots & Time Series Plots",
      labTitle: "Lab 4: Subplots Grids, Styling & Time-Series Analysis",
      experiments: [
        {
          id: "dv-pd-e7",
          title: "Pie Charts & Part-to-Whole Compositions",
          desc: "Create pie and donut charts using df.plot.pie() with percentage annotations, slice explode effects, and multi-column pie subplots.",
          expected: "Clean pie charts displaying percentage distributions of categorical market shares.",
          code: `import pandas as pd
import matplotlib.pyplot as plt

# Market Share Data
df_market = pd.Series([35, 25, 20, 12, 8], 
                      index=['Company A', 'Company B', 'Company C', 'Company D', 'Others'], 
                      name="Market Share")

# 1. Pie Chart with explode and autopct
plt.figure(figsize=(7, 7))
explode_list = [0.08, 0, 0, 0, 0] # Highlight leader
colors_list = ['#2b5c8f', '#4682b4', '#6baed6', '#9ecae1', '#c6dbef']

df_market.plot.pie(
    autopct='%1.1f%%', 
    startangle=140, 
    explode=explode_list, 
    colors=colors_list, 
    shadow=True,
    title="2026 Smartphone Market Share Distribution"
)
plt.ylabel("") # Hide default Series name label
plt.show()`,
          content: {
            aim: {
              text: "To construct pie charts and donut plots using Pandas Series.plot.pie() for proportional part-to-whole data analysis.",
              bullets: [
                "Format slice labels and percentage values using `autopct='%1.1f%%'`.",
                "Emphasize key slices using the `explode` list parameter.",
                "Adjust starting orientation angle with `startangle`."
              ]
            },
            theory: [
              {
                title: "Pie Charts in Pandas",
                body: [
                  "Pie charts represent categorical data as slices of a circle, where each slice area corresponds to its proportion of the total.",
                  "In Pandas, `.plot.pie()` is most commonly called on a 1D Series or DataFrame with `subplots=True`.",
                  "Setting `ylabel('')` is recommended because Pandas defaults to displaying the Series name on the Y-axis label."
                ]
              }
            ],
            procedure: [
              "Step 1: Create a Pandas Series with categorical index and numerical values.",
              "Step 2: Define `explode_list` with slice offset values.",
              "Step 3: Call `df_market.plot.pie(autopct='%1.1f%%', explode=..., startangle=140)`.",
              "Step 4: Suppress default Y-label using `plt.ylabel('')`.",
              "Step 5: Render and inspect proportional slices."
            ],
            pretest: [
              { question: "Which parameter formats percentage numbers inside pie slices?", options: ["format", "autopct", "percent", "labels"], answerIndex: 1 },
              { question: "What does the `explode` parameter do in a pie chart?", options: ["Deletes slice", "Offsets selected slice(s) outward from circle center", "Rotates plot 360", "Blows up figure"], answerIndex: 1 },
              { question: "Why is `plt.ylabel('')` commonly called after Series.plot.pie()?", options: ["Fixes error", "Removes redundant default Series name label on Y-axis", "Deletes legend", "Resets axis"], answerIndex: 1 },
              { question: "What does `startangle` control in a pie chart?", options: ["Pie radius", "Angle (degrees) where the first pie slice starts", "Slice thickness", "Shadow angle"], answerIndex: 1 },
              { question: "Can a DataFrame with 2 columns plot 2 pie charts simultaneously?", options: ["No", "Yes, with subplots=True", "Only in Seaborn", "Requires 3D"], answerIndex: 1 }
            ],
            posttest: [
              { question: "What format string `autopct='%1.2f%%'` displays?", options: ["2 decimal place percentage (e.g., 25.50%)", "Integer percentage", "Fraction", "Scientific notation"], answerIndex: 0 },
              { question: "How do you transform a standard pie chart into a donut chart in Matplotlib/Pandas?", options: ["donut=True", "Adding a center white circle wedge onto the axes", "kind='donut'", "cut=50"], answerIndex: 1 },
              { question: "What parameter enables subtle shadow under pie slices?", options: ["shadow=True", "depth=True", "3d=True", "elevation=10"], answerIndex: 0 },
              { question: "What happens if values in Series.plot.pie() do not sum to 100?", options: ["Raises Error", "Pandas automatically normalizes values so slice proportions sum to 100%", "Plot truncates", "Fills rest with black"], answerIndex: 1 },
              { question: "Which parameter specifies custom slice color lists?", options: ["color_list", "colors", "cmap_list", "palette"], answerIndex: 1 }
            ]
          }
        },
        {
          id: "dv-pd-e8",
          title: "Multi-Plot Layouts & Subplots Grids",
          desc: "Generate multi-panel figure grids using df.plot(subplots=True, layout=(rows, cols)) with shared axes and custom Matplotlib subplots integration.",
          expected: "A multi-panel figure displaying separate subplots for distinct metrics with aligned X-axes.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate multi-variable time series
np.random.seed(42)
dates = pd.date_range(start='2026-01-01', periods=100, freq='D')
df_metrics = pd.DataFrame({
    'CPU_Usage': np.random.normal(60, 15, 100).clip(10, 100),
    'Memory_GB': np.random.normal(12, 2, 100).clip(4, 16),
    'Network_MBps': np.random.exponential(50, 100),
    'Disk_IOPS': np.random.poisson(300, 100)
}, index=dates)

# 2x2 Subplots Grid
axes = df_metrics.plot(
    subplots=True, 
    layout=(2, 2), 
    figsize=(10, 6), 
    sharex=True, 
    grid=True, 
    title="System Server Monitoring Dashboard"
)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To construct multi-panel subplots grids using Pandas `subplots=True` and `layout=(rows, cols)`.",
              bullets: [
                "Use `subplots=True` to plot each DataFrame column in a dedicated sub-axes.",
                "Organize grid arrangement using `layout=(rows, cols)`.",
                "Synchronize X-axis zoom and scale across subplots using `sharex=True`."
              ]
            },
            theory: [
              {
                title: "Faceting & Subplots Grids in Pandas",
                body: [
                  "Plotting multiple variables with different units on a single axis causes scaling issues.",
                  "Setting `subplots=True` instructs Pandas to split columns into separate sub-axes.",
                  "The `layout=(rows, cols)` argument defines the grid shape (e.g. `(2, 2)` for 4 plots).",
                  "![Pandas Multi-Plot Subplots and Custom Styling](/pandas_subplots_styling.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame with multiple numerical columns.",
              "Step 2: Call `df.plot(subplots=True, layout=(2, 2), figsize=(10, 6), sharex=True)`.",
              "Step 3: Call `plt.tight_layout()` to adjust spacing and prevent overlapping axis labels.",
              "Step 4: Display 4-panel dashboard figure."
            ],
            pretest: [
              { question: "Which parameter splits DataFrame columns into individual subplots?", options: ["split=True", "subplots=True", "facet=True", "grid=True"], answerIndex: 1 },
              { question: "How do you specify a 2-row by 3-column subplots grid layout in df.plot()?", options: ["grid=[2,3]", "layout=(2, 3)", "shape=(2,3)", "matrix=(2,3)"], answerIndex: 1 },
              { question: "What does `sharex=True` do in subplots?", options: ["Copies plot title", "Links and aligns X-axis tick limits across all subplots", "Shares line color", "Shares legend"], answerIndex: 1 },
              { question: "Which Matplotlib function automatically adjusts padding between subplots?", options: ["plt.auto_pad()", "plt.tight_layout()", "plt.clean_axes()", "plt.fit()"], answerIndex: 1 },
              { question: "What does df.plot(subplots=True) return?", options: ["List/Array of Matplotlib Axes objects", "DataFrame", "String", "Image buffer"], answerIndex: 0 }
            ],
            posttest: [
              { question: "If you have 6 columns and specify layout=(2, 2), what happens?", options: ["Error / ValueError due to grid shape mismatch", "Truncates 2 columns", "Expands grid", "Overlaps"], answerIndex: 0 },
              { question: "How can you access an individual subplot axes returned by df.plot(subplots=True)?", options: ["axes[row, col] or axes.flat[i]", "df.get_axes(i)", "plt.select(i)", "axes.index(i)"], answerIndex: 0 },
              { question: "What argument prevents Y-axes from sharing identical scale limits across subplots?", options: ["sharey=False", "y_scale='free'", "independent=True", "y_link=False"], answerIndex: 0 },
              { question: "Can subplots use different plot kinds per column directly in single df.plot() call?", options: ["No, single df.plot() applies same kind unless iterating axes", "Yes with kind=['a','b']", "Only in Seaborn", "Requires 3D"], answerIndex: 0 },
              { question: "What does `figsize=(10, 6)` specify?", options: ["Figure width=10 inches, height=6 inches", "DPI resolution", "Pixel size 10x6", "Grid margins"], answerIndex: 0 }
            ]
          }
        },
        {
          id: "dv-pd-e9",
          title: "Customizing Aesthetics, Colormaps & Dual Y-Axes",
          desc: "Enhance visual communication with custom colormaps, axis rotators, legend positioning, grid styling, and secondary Y-axes (`secondary_y`).",
          expected: "A publication-ready dual Y-axis plot displaying metrics measured in different units alongside custom colormap styling.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate dataset with metrics on different scales
dates = pd.date_range('2026-01-01', periods=12, freq='ME')
df_dual = pd.DataFrame({
    'Ad_Campaign_Units': [100, 120, 150, 170, 200, 220, 240, 260, 280, 300, 320, 350],
    'Conversion_Rate_Pct': [2.1, 2.3, 2.8, 3.1, 3.5, 3.9, 4.2, 4.0, 4.5, 4.8, 5.1, 5.5]
}, index=dates.strftime('%b'))

# Plot with Secondary Y-Axis
ax = df_dual['Ad_Campaign_Units'].plot(kind='bar', color='#3498db', width=0.4, position=1, figsize=(9, 5), legend=True)
ax2 = df_dual['Conversion_Rate_Pct'].plot(kind='line', color='#e74c3c', marker='o', linewidth=2.5, secondary_y=True, ax=ax, legend=True)

ax.set_ylabel("Campaign Units Sold", color='#3498db', fontweight='bold')
ax2.set_ylabel("Conversion Rate (%)", color='#e74c3c', fontweight='bold')
plt.title("Ad Campaign Units vs Conversion Rate (Dual Axis)")
plt.grid(True, linestyle=':', alpha=0.6)
plt.show()`,
          content: {
            aim: {
              text: "To apply custom plot styling, colormaps, legend positioning, and secondary Y-axes (`secondary_y`) in Pandas.",
              bullets: [
                "Plot two metrics with vastly different scales on a single figure using `secondary_y=True`.",
                "Rotate x-axis tick labels using `rot=45`.",
                "Customize axes labels and legends for dual-axis plots."
              ]
            },
            theory: [
              {
                title: "Dual Y-Axis Plotting in Pandas",
                body: [
                  "When comparing two metrics measured in different units (e.g. Sales Volume in Thousands vs Profit Margin in %), plotting them on a single Y-axis makes the smaller metric invisible.",
                  "Pandas supports `secondary_y=True` or `secondary_y=['Col_Name']`, which creates a secondary right-hand Y-axis with independent scaling.",
                  "Custom colors and distinct Y-axis labels ensure clear differentiation between the left and right metric axes."
                ]
              }
            ],
            procedure: [
              "Step 1: Prepare a DataFrame containing metrics with different numerical ranges.",
              "Step 2: Plot primary metric as bar chart on primary axis `ax`.",
              "Step 3: Plot secondary metric as line chart using `secondary_y=True` passed to same `ax`.",
              "Step 4: Set distinct Y-axis labels for `ax` (left) and `ax2` (right).",
              "Step 5: Add background grid and display figure."
            ],
            pretest: [
              { question: "Which argument plots a metric on a right-hand secondary Y-axis?", options: ["second_axis=True", "secondary_y=True", "right_y=True", "axis2=True"], answerIndex: 1 },
              { question: "Which parameter rotates X-axis tick labels in df.plot()?", options: ["tilt", "rot", "angle", "rotate"], answerIndex: 1 },
              { question: "Why are dual Y-axis plots useful?", options: ["Speeds up code", "Plots metrics with vastly different scales/units together", "Removes outliers", "Fixes NaN"], answerIndex: 1 },
              { question: "How do you suppress legend rendering in df.plot()?", options: ["legend=False", "no_legend=True", "hide_keys=True", "keys=False"], answerIndex: 0 },
              { question: "What does `width=0.4` control in a bar chart?", options: ["Bar width relative to category spacing", "Line stroke width", "Figure width", "Border width"], answerIndex: 0 }
            ],
            posttest: [
              { question: "When using secondary_y=True, how many Y-axes are present in the figure?", options: ["1", "2 (Left primary, Right secondary)", "3", "None"], answerIndex: 1 },
              { question: "Which method exports a Matplotlib figure buffer to an image file?", options: ["df.save()", "plt.savefig('filename.png')", "df.to_png()", "plt.export()"], answerIndex: 1 },
              { question: "Why should `plt.savefig()` be called BEFORE `plt.show()`?", options: ["plt.show() clears the active figure buffer", "plt.savefig() crashes after show", "No reason", "For DPI speed"], answerIndex: 0 },
              { question: "What argument sets the DPI resolution when saving figures?", options: ["res=300", "dpi=300", "quality=100", "pixels=300"], answerIndex: 1 },
              { question: "What does `bbox_inches='tight'` do during figure export?", options: ["Crops empty whitespace around plot borders", "Compresses file size", "Zooms in", "Adds frame"], answerIndex: 0 }
            ]
          }
        },
        {
          id: "dv-pd-e10",
          title: "Advanced Time-Series Visualization & Rolling Windows",
          desc: "Plot time-series financial/sensor data with Pandas DatetimeIndex, rolling window moving averages (`rolling()`), and resampled aggregates (`resample()`).",
          expected: "A time-series plot displaying volatile raw daily readings overlaid with smooth 7-day and 30-day moving average trend lines.",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate daily stock price time series
np.random.seed(42)
dates = pd.date_range(start='2025-01-01', end='2026-06-01', freq='D')
returns = np.random.normal(0.0005, 0.015, size=len(dates))
price_path = 100 * np.exp(np.cumsum(returns))

df_stock = pd.DataFrame({'Close': price_path}, index=dates)

# Calculate 7-day and 30-day rolling moving averages
df_stock['MA_7'] = df_stock['Close'].rolling(window=7).mean()
df_stock['MA_30'] = df_stock['Close'].rolling(window=30).mean()

# Plot Time Series with Rolling Trends
plt.figure(figsize=(10, 5))
df_stock['Close'].plot(color='lightgray', alpha=0.7, label='Daily Close Price', linewidth=1)
df_stock['MA_7'].plot(color='crimson', label='7-Day Moving Avg', linewidth=2)
df_stock['MA_30'].plot(color='navy', label='30-Day Moving Avg', linewidth=2.5)

plt.title("Stock Price Trend & Moving Averages Analysis")
plt.ylabel("Price ($)")
plt.xlabel("Date")
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)
plt.show()`,
          content: {
            aim: {
              text: "To visualize time-series trends using Pandas DatetimeIndex, rolling window moving averages (`rolling()`), and resampling (`resample()`).",
              bullets: [
                "Leverage Pandas native DatetimeIndex handling for automatic date formatting on X-axis.",
                "Smooth noisy time-series data using `df['col'].rolling(window=N).mean()`.",
                "Overlay raw readings with short-term and long-term trend lines."
              ]
            },
            theory: [
              {
                title: "Time-Series Visualization in Pandas",
                body: [
                  "Pandas shines in time-series analysis due to its DatetimeIndex. When plotting data with a DatetimeIndex, Pandas formats axis ticks automatically into readable months, quarters, or years.",
                  "Raw daily time-series data often contains high-frequency noise. Calling `.rolling(window=N).mean()` computes a moving average over N periods, smoothing out noise to reveal macro trends.",
                  "Combining raw data (faded alpha) with rolling averages (bold lines) provides both detailed granular insights and clear trend direction."
                ]
              }
            ],
            procedure: [
              "Step 1: Create a DataFrame indexed by `pd.date_range()`.",
              "Step 2: Compute 7-day and 30-day rolling means using `.rolling(window=N).mean()`.",
              "Step 3: Plot raw Close price with light color and `alpha=0.7`.",
              "Step 4: Plot 7-day MA in red and 30-day MA in navy bold lines.",
              "Step 5: Add title, legend, gridlines, and render time-series plot."
            ],
            pretest: [
              { question: "Which Pandas method computes rolling window statistics?", options: ["df.window()", "df.rolling()", "df.moving()", "df.slide()"], answerIndex: 1 },
              { question: "What does window=7 specify in rolling() for daily data?", options: ["7 months", "7 consecutive days rolling window", "7 years", "7 data columns"], answerIndex: 1 },
              { question: "Which Pandas function generates a range of datetime timestamps?", options: ["pd.date_range()", "pd.make_dates()", "pd.calendar()", "pd.time_series()"], answerIndex: 0 },
              { question: "Why are initial rows in a rolling mean result filled with NaN?", options: ["Data error", "Insufficient prior observations to fill full window size N", "Bug in pandas", "Negative values"], answerIndex: 1 },
              { question: "Which method changes time-series sampling frequency (e.g. daily to monthly)?", options: ["df.resample()", "df.rebin()", "df.change_freq()", "df.group_time()"], answerIndex: 0 }
            ],
            posttest: [
              { question: "In time-series plots, what effect does a larger rolling window size (e.g. 200 vs 7) have?", options: ["More noise", "Smoother line with greater lag behind rapid price shifts", "Faster computation", "No effect"], answerIndex: 1 },
              { question: "What does `df.resample('M').mean().plot()` do?", options: ["Plots daily data", "Aggregates data by Month end and plots monthly averages", "Plots minute data", "Removes months"], answerIndex: 1 },
              { question: "How does Pandas handle missing dates in a continuous time-series line plot?", options: ["Crashes", "Skips missing timestamps or leaves visual gaps depending on indexing", "Fills zeros", "Turns red"], answerIndex: 1 },
              { question: "Which string code represents monthly frequency in pd.date_range / resample?", options: ["'D'", "'M' / 'ME'", "'Y'", "'W'"], answerIndex: 1 },
              { question: "Can rolling() compute statistics other than mean (e.g. std, sum, median)?", options: ["No, only mean", "Yes, supports rolling std(), sum(), median(), min(), max()", "Only with SciPy", "Requires C++"], answerIndex: 1 }
            ]
          }
        }
      ]
    }
  ]
};
