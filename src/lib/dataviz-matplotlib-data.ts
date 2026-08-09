// src/lib/dataviz-matplotlib-data.ts

import { Course } from './course-data';
import { datavizMatplotlibShortNotes } from './dataviz-matplotlib-short-notes';

export const datavizMatplotlibCourse: Course = {
  id: "data-visualization-with-matplotlib",
  title: "Data Visualization with Matplotlib",
  shortNotes: datavizMatplotlibShortNotes,
  objectives: [
    "To master the core architecture, figure anatomy, and plotting interfaces (Pyplot state-machine vs Object-Oriented API) of Matplotlib.",
    "To generate publication-quality line plots, vertical and horizontal bar charts, stacked categorical plots, histograms, and pie charts.",
    "To analyze bivariate and multi-variable relationships using customizable scatter plots, color mapping gradients, and bubble size encoding.",
    "To evaluate statistical distributions and measurement uncertainties using box plots, violin plots, and error bar visualizers.",
    "To construct complex multi-panel dashboard layouts using subplots, GridSpec managers, and dual-scale twin axes systems.",
    "To customize plot aesthetics including spines positioning, text annotations with arrows, legend anchoring, and colormaps.",
    "To visualize 2D tabular grids and correlation matrices using imshow and colormap normalization.",
    "To apply global style sheets and export high-resolution vector and raster figures (PNG, SVG, PDF) suitable for research publications and web applications."
  ],
  introduction: [
    "Matplotlib is the foundational, low-level data visualization library in Python. Developed originally to replicate MATLAB plotting capabilities within Python, Matplotlib provides complete fine-grained control over every visual component rendered on screen—from figure margins and axis spines to individual tick mark placements and text font properties.",
    "This comprehensive laboratory course guides students step-by-step through the core concepts, functions, and workflows of Matplotlib. Starting with basic line and bar charts, learners quickly progress through distribution plots, multi-variable scatter visualizers, statistical boxplots, specialized polar charts, complex GridSpec multi-panel dashboards, and publication-ready figure exports.",
    "By completing these hands-on experiments, students gain full proficiency in transforming raw numerical and tabular datasets into expressive, aesthetically compelling visual insights using clean, professional Python code."
  ],
  targetAudience: {
    primary: "Data Analysts, Data Scientists, Researchers, and Engineers who require full programmatic control over plot customization and scientific figure creation in Python.",
    prerequisites: [
      "Basic Python programming fundamentals (variables, functions, lists)",
      "Understanding of numerical computing concepts (NumPy arrays)",
      "Familiarity with Python execution environments (Jupyter Notebooks / Pyodide)"
    ],
    usefulFor: [
      "Scientific Researchers preparing publication-ready figures for journals",
      "Data Analysts building customizable exploratory data charts",
      "Machine Learning Engineers visualizing model metrics, loss curves, and confusion matrices"
    ]
  },
  alignment: {
    university: "Virtual Lab",
    department: "Data Science & Visualization",
    course: "Data Visualization with Matplotlib",
    credits: "L:0 T:0 P:2 C:1",
    yearSem: "Elective",
    branches: "Computer Science, AI & DS, Data Science, Information Technology",
    totalExperiments: "10",
    compiler: "Python 3, Matplotlib, NumPy, Pandas, Pyodide",
    units: [
      { unit: "Module 1", topics: "Pyplot Basics, Line, Bar & Distribution Charts", weeks: "Week 1-2" },
      { unit: "Module 2", topics: "Bivariate Scatter Plots, Box Plots & Specialized Visuals", weeks: "Week 3-4" },
      { unit: "Module 3", topics: "Multi-Panel Subplots, GridSpec & Twin Axes Systems", weeks: "Week 5-6" },
      { unit: "Module 4", topics: "Advanced Styling, Heatmaps & Publication Exports", weeks: "Week 7-8" }
    ]
  },
  weeks: [
    {
      title: "Module 1: Pyplot Basics, Line, Bar & Distribution Charts",
      objective: "Master basic line plots, vertical & horizontal bar charts, pie charts, and distribution histograms using Matplotlib.",
      tutorial: "Tutorial 1: Pyplot API vs Object-Oriented Architecture",
      labTitle: "Lab 1: Fundamental Plot Types and Customizations",
      experiments: [
        {
          id: "dv-mpl-e1",
          title: "Basic Line Plots & Pyplot vs OO Architecture",
          desc: "Learn Matplotlib's dual architecture (Pyplot vs Object-Oriented API) and create single and multi-line plots with customized line styles, markers, grids, and labels.",
          expected: "A clean figure displaying sine and cosine curves with distinct line styles, markers, gridlines, axis labels, and a legend.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Generate domain values
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Object-Oriented API: Create Figure and Axes
fig, ax = plt.subplots(figsize=(8, 4.5))

# Plot lines with custom styles and markers
ax.plot(x, y1, color='#0284c7', linestyle='-', linewidth=2.5, marker='o', markevery=10, label='Sine Wave sin(x)')
ax.plot(x, y2, color='#0d9488', linestyle='--', linewidth=2.0, marker='s', markevery=10, label='Cosine Wave cos(x)')

# Set title and axis labels
ax.set_title('Harmonic Wave Oscillations', fontsize=14, fontweight='bold', pad=12)
ax.set_xlabel('Time Domain (x)', fontsize=11)
ax.set_ylabel('Amplitude (y)', fontsize=11)

# Configure gridlines and legend
ax.grid(True, linestyle=':', alpha=0.6)
ax.legend(loc='upper right', frameon=True)

# Display chart
plt.show()`,
          content: {
            aim: {
              text: "To understand Matplotlib's dual architecture and create customizable line plots using the Object-Oriented API.",
              bullets: [
                "Understand the difference between stateful Pyplot (`plt.plot`) and explicit Object-Oriented (`fig, ax`) interfaces.",
                "Learn how to customize line properties (color, linewidth, linestyle, markers).",
                "Apply axis labels, titles, gridlines, and legend positioning."
              ]
            },
            theory: [
              {
                title: "Matplotlib Architecture & Dual Interfaces",
                body: [
                  "Matplotlib consists of a hierarchy of visual components: Figure (the canvas window), Axes (the plot area containing ticks, gridlines, and data traces), Axis (the number lines), and Artists (lines, text, patches).",
                  "Matplotlib supports two programming modes: 1) Pyplot stateful interface (`plt.plot()`), which manages active figure states implicitly, and 2) Object-Oriented (OO) interface (`fig, ax = plt.subplots()`), which provides explicit, reusable handle control over every element.",
                  "![Matplotlib Figure Anatomy](/matplotlib_anatomy.png)"
                ]
              },
              {
                title: "Line Plot Customization Functions",
                body: [
                  "`ax.plot(x, y, ...)`: Renders 2D line traces. Key parameters include `color` (hex codes or names), `linestyle` ('-', '--', '-.', ':'), `linewidth` (float), `marker` ('o', 's', '^', 'd'), and `label` (string for legend).",
                  "`ax.grid(True)`: Toggles major gridlines. Stylize with `linestyle=':'` and `alpha=0.6` for clean readability."
                ]
              }
            ],
            procedure: [
              "Step 1: Import `matplotlib.pyplot as plt` and `numpy as np`.",
              "Step 2: Generate continuous x values using `np.linspace(0, 10, 100)`.",
              "Step 3: Compute sine and cosine values for y1 and y2.",
              "Step 4: Create a figure and axes handle using `fig, ax = plt.subplots(figsize=(8, 4.5))`.",
              "Step 5: Call `ax.plot()` twice to plot y1 and y2 with custom colors, line styles, and markers.",
              "Step 6: Set title, x-label, y-label, gridlines, and legend using `ax.set_title()`, `ax.set_xlabel()`, `ax.grid()`, and `ax.legend()`.",
              "Step 7: Render the plot using `plt.show()`."
            ],
            pretest: [
              {
                question: "Which Matplotlib interface is recommended for complex multi-panel figures?",
                options: [
                  "Implicit Pyplot API (plt.plot)",
                  "Explicit Object-Oriented API (fig, ax)",
                  "MATLAB compatibility mode",
                  "Direct canvas draw API"
                ],
                answerIndex: 1,
                hint: "The Object-Oriented interface explicitly creates figure and axes handles."
              },
              {
                question: "What does the `markevery` parameter do in `ax.plot()`?",
                options: [
                  "Sets marker size",
                  "Displays markers only at specified index steps to avoid cluttering",
                  "Changes marker color",
                  "Removes markers completely"
                ],
                answerIndex: 1,
                hint: "It controls how frequently markers appear along a dense line."
              }
            ],
            posttest: [
              {
                question: "What function creates both Figure and Axes objects simultaneously?",
                options: ["plt.figure()", "plt.axes()", "plt.subplots()", "plt.plot()"],
                answerIndex: 2,
                hint: "This helper returns a tuple containing `(fig, ax)`."
              },
              {
                question: "In the OO API, which method is used to set the chart title on an axes?",
                options: ["ax.title()", "ax.set_title()", "ax.add_title()", "plt.title()"],
                answerIndex: 1,
                hint: "OO methods on axes handles start with `set_`."
              }
            ],
            references: [
              "Matplotlib Pyplot Guide — https://matplotlib.org/stable/tutorials/introductory/pyplot.html",
              "Matplotlib Anatomy of a Figure — https://matplotlib.org/stable/gallery/showcase/anatomy.html"
            ]
          }
        },
        {
          id: "dv-mpl-e2",
          title: "Categorical Plots: Vertical, Horizontal & Stacked Bar Charts",
          desc: "Create vertical bar plots, horizontal bar charts, stacked bar charts, and grouped category bars using ax.bar and ax.barh with custom widths, colors, and value labels.",
          expected: "A dual-panel figure illustrating categorical product sales: vertical grouped bar charts alongside stacked horizontal bar charts with value text annotations.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Categorical data
categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys']
q1_sales = [45, 28, 35, 18, 22]
q2_sales = [52, 34, 40, 25, 30]

x = np.arange(len(categories))
width = 0.35

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 1. Grouped Vertical Bar Chart
rects1 = ax1.bar(x - width/2, q1_sales, width, label='Q1 Sales', color='#0284c7', edgecolor='white')
rects2 = ax1.bar(x + width/2, q2_sales, width, label='Q2 Sales', color='#0d9488', edgecolor='white')

ax1.set_title('Grouped Category Sales Comparison', fontsize=12, fontweight='bold')
ax1.set_ylabel('Revenue ($k)')
ax1.set_xticks(x)
ax1.set_xticklabels(categories, rotation=15)
ax1.legend()
ax1.bar_label(rects1, padding=2, fmt='%d')
ax1.bar_label(rects2, padding=2, fmt='%d')
ax1.grid(axis='y', linestyle='--', alpha=0.5)

# 2. Horizontal Stacked Bar Chart
ax2.barh(categories, q1_sales, label='Q1', color='#0284c7', edgecolor='white')
ax2.barh(categories, q2_sales, left=q1_sales, label='Q2', color='#d97706', edgecolor='white')

ax2.set_title('Stacked Category Revenue Share', fontsize=12, fontweight='bold')
ax2.set_xlabel('Cumulative Revenue ($k)')
ax2.legend()
ax2.grid(axis='x', linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To construct vertical, horizontal, grouped, and stacked bar charts for categorical data evaluation.",
              bullets: [
                "Master `ax.bar` for vertical bar plots and `ax.barh` for horizontal bar plots.",
                "Learn how to create grouped bars by calculating numeric x-offsets.",
                "Create stacked bar plots using `bottom` (vertical) or `left` (horizontal) parameters.",
                "Annotate bar values directly using `ax.bar_label()`."
              ]
            },
            theory: [
              {
                title: "Categorical Bar Plots in Matplotlib",
                body: [
                  "`ax.bar(x, height, width, bottom)` renders vertical rectangular bars. `ax.barh(y, width, height, left)` renders horizontal bars, which are ideal when category labels are long.",
                  "To create stacked bar charts, pass the values of the lower bars to the `bottom` argument in `ax.bar()` or the `left` argument in `ax.barh()`.",
                  "![Bar Chart Styles Diagram](/matplotlib_bar_charts.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Define category names array and corresponding numerical metric arrays.",
              "Step 2: Calculate numeric x positions with offsets (`x - width/2`, `x + width/2`) for grouped bars.",
              "Step 3: Create a 1x2 subplot layout (`fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))`).",
              "Step 4: Plot grouped vertical bars on `ax1` using `ax1.bar()` and add data labels with `ax1.bar_label()`.",
              "Step 5: Plot horizontal stacked bars on `ax2` using `ax2.barh()` with the `left` argument for stacking.",
              "Step 6: Set custom titles, tick labels, gridlines, and call `plt.tight_layout()`.",
              "Step 7: Render figure with `plt.show()`."
            ],
            pretest: [
              {
                question: "Which parameter in `ax.bar()` enables vertical stacking of bars?",
                options: ["left", "bottom", "stack", "align"],
                answerIndex: 1,
                hint: "`bottom` specifies the starting baseline elevation for vertical bars."
              },
              {
                question: "Why are horizontal bar charts (`ax.barh`) often preferred over vertical bar charts?",
                options: [
                  "They compute faster",
                  "They accommodate long category text labels without overcrowding",
                  "They support higher values",
                  "They do not require x ticks"
                ],
                answerIndex: 1,
                hint: "Horizontal layout provides ample vertical space for category names."
              }
            ],
            posttest: [
              {
                question: "Which built-in Matplotlib function automatically adds numerical labels to bars?",
                options: ["ax.annotate_bars()", "ax.bar_label()", "ax.text_bars()", "ax.label_values()"],
                answerIndex: 1,
                hint: "This convenient method was introduced in Matplotlib 3.4."
              },
              {
                question: "In `ax.barh(y, width)`, what does the `width` parameter represent?",
                options: ["Bar vertical thickness", "Bar horizontal length along X-axis", "Space between bars", "Border width"],
                answerIndex: 1,
                hint: "In horizontal bars, width represents value length."
              }
            ],
            references: [
              "Matplotlib Bar Plot Documentation — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bar.html"
            ]
          }
        },
        {
          id: "dv-mpl-e3",
          title: "Proportional & Distribution Plots: Pie Charts & Histograms",
          desc: "Create single and exploded pie charts, donut charts, and continuous numerical frequency histograms with custom binning and cumulative density curves.",
          expected: "A multi-panel figure containing an exploded donut pie chart and a frequency distribution histogram overlaid with a density fit curve.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# 1. Proportional Data for Donut Chart
browser_labels = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Others']
market_share = [62.5, 19.2, 6.1, 5.4, 6.8]
colors = ['#0284c7', '#0d9488', '#d97706', '#6366f1', '#94a3b8']
explode = (0.05, 0, 0, 0, 0) # Explode Chrome slice

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Donut Chart via wedgeprops
wedges, texts, autotexts = ax1.pie(
    market_share, 
    labels=browser_labels, 
    autopct='%1.1f%%',
    startangle=140, 
    colors=colors, 
    explode=explode,
    pctdistance=0.75,
    wedgeprops=dict(width=0.4, edgecolor='white', linewidth=2)
)
ax1.set_title('Global Browser Market Share (Donut Chart)', fontsize=12, fontweight='bold')

# 2. Numerical Frequency Histogram
np.random.seed(42)
scores = np.random.normal(loc=72, scale=12, size=500)

counts, bins, patches = ax2.hist(
    scores, 
    bins=20, 
    color='#0284c7', 
    edgecolor='white', 
    alpha=0.75, 
    density=True,
    label='Score Frequency'
)

# Overlay normal probability density function (PDF)
mu, std = 72, 12
pdf = (1 / (std * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((bins - mu) / std)**2)
ax2.plot(bins, pdf, color='#e11d48', linewidth=2.5, label='Normal Fit (KDE)')

ax2.set_title('Student Exam Score Distribution', fontsize=12, fontweight='bold')
ax2.set_xlabel('Exam Score')
ax2.set_ylabel('Probability Density')
ax2.legend()
ax2.grid(True, linestyle=':', alpha=0.6)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To build pie/donut charts for categorical proportions and histograms for numerical frequency distributions.",
              bullets: [
                "Understand slice explosion (`explode`) and percentage formatting (`autopct`) in `ax.pie()`.",
                "Transform pie charts into modern donut charts using `wedgeprops=dict(width=0.4)`.",
                "Construct frequency histograms with custom bin sizes (`bins`) and probability density normalization (`density=True`)."
              ]
            },
            theory: [
              {
                title: "Pie Charts, Donut Charts & Frequency Histograms",
                body: [
                  "`ax.pie(x, labels, autopct, explode, wedgeprops)` displays percentage contributions to a whole. Setting `wedgeprops=dict(width=0.4)` cuts out the center to produce a clean donut chart.",
                  "`ax.hist(x, bins, density)` divides continuous numeric data into range bins and counts frequencies. Setting `density=True` scales bin heights so the total histogram area equals 1, enabling probability curve overlays.",
                  "![Pie and Histogram Anatomy](/matplotlib_pie_histogram.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Prepare categorical market share data and continuous score distribution data.",
              "Step 2: Create 1x2 subplots with `fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))`.",
              "Step 3: Call `ax1.pie()` with `autopct='%1.1f%%'`, `explode`, and `wedgeprops=dict(width=0.4)` to render donut chart.",
              "Step 4: Call `ax2.hist()` with `bins=20` and `density=True` to plot normalized frequency histogram.",
              "Step 5: Compute Gaussian probability density formula and plot PDF line overlay using `ax2.plot()`.",
              "Step 6: Add labels, titles, legend, apply `plt.tight_layout()`, and display with `plt.show()`."
            ],
            pretest: [
              {
                question: "What formatting string produces percentage labels with 1 decimal place in `ax.pie()`?",
                options: ["'%d%%'", "'%1.1f%%'", "'%.2f'", "'%s%'"],
                answerIndex: 1,
                hint: "'%1.1f%%' formats floating point values with one decimal followed by a percent sign."
              },
              {
                question: "When `density=True` is passed to `ax.hist()`, what does the total area of the histogram equal?",
                options: ["100", "Total count of data points", "1.0", "Maximum bin height"],
                answerIndex: 2,
                hint: "Probability density integration over the domain equals 1.0."
              }
            ],
            posttest: [
              {
                question: "How do you transform a standard pie chart into a donut chart in Matplotlib?",
                options: [
                  "Pass `donut=True`",
                  "Use `wedgeprops=dict(width=val)` to hollow out the center",
                  "Set `hole=True`",
                  "Call `ax.donut()`"
                ],
                answerIndex: 1,
                hint: "Adjusting wedge width leaves a hollow central hole."
              },
              {
                question: "What argument in `ax.pie()` controls slice separation from the center?",
                options: ["separate", "explode", "offset", "detach"],
                answerIndex: 1,
                hint: "`explode` takes a tuple of offset distances."
              }
            ],
            references: [
              "Matplotlib Pie Charts — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.pie.html",
              "Matplotlib Histograms — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.hist.html"
            ]
          }
        }
      ]
    },
    {
      title: "Module 2: Bivariate Scatter Plots, Box Plots & Specialized Visuals",
      objective: "Analyze multi-variable relationships using scatter bubble charts, statistical boxplots, and specialized polar charts.",
      tutorial: "Tutorial 2: Bivariate Mapping & Statistical Distribution Tools",
      labTitle: "Lab 2: Scatter Mapping, Boxplots, Stem & Polar Charts",
      experiments: [
        {
          id: "dv-mpl-e4",
          title: "Bivariate Analysis: Scatter Plots, Color Mapping & Bubble Charts",
          desc: "Create multi-dimensional scatter plots using ax.scatter, encoding variables into marker positions (x, y), point colors (c/cmap), and marker sizes (s).",
          expected: "A 4D bubble scatter plot mapping student study hours, test scores, attendance percentage (color gradient), and assignment submissions (point size).",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Generate synthetic multivariate student performance data
np.random.seed(101)
num_students = 120
study_hours = np.random.uniform(2, 20, num_students)
exam_score = 40 + 2.8 * study_hours + np.random.normal(0, 6, num_students)
attendance = np.random.uniform(50, 100, num_students) # mapped to color
assignments = np.random.randint(2, 12, num_students)  # mapped to marker size

fig, ax = plt.subplots(figsize=(9, 5))

# 4-Dimensional Bubble Scatter Plot
scatter = ax.scatter(
    study_hours, 
    exam_score, 
    c=attendance, 
    s=assignments * 25, 
    cmap='viridis', 
    alpha=0.75, 
    edgecolors='white', 
    linewidth=0.8
)

# Attach Colorbar handle
cbar = fig.colorbar(scatter, ax=ax)
cbar.set_label('Attendance Rate (%)', fontsize=10)

ax.set_title('Student Academic Performance (Color=Attendance, Size=Assignments)', fontsize=12, fontweight='bold')
ax.set_xlabel('Study Hours per Week')
ax.set_ylabel('Exam Score (%)')
ax.grid(True, linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To construct 4D scatter bubble charts mapping data to marker coordinates, size, and colormaps.",
              bullets: [
                "Map continuous X and Y variables to marker positions using `ax.scatter()`.",
                "Encode a 3rd continuous variable into color gradients using `c` and `cmap`.",
                "Encode a 4th continuous variable into marker areas using `s`.",
                "Attach continuous colorbar handles using `fig.colorbar()`."
              ]
            },
            theory: [
              {
                title: "Multi-Dimensional Scatter Plot Architecture",
                body: [
                  "`ax.scatter(x, y, s, c, cmap, alpha)` enables multi-variable visual encoding. Positions (x, y) represent primary relationships, marker size `s` represents magnitude, and color `c` mapped through a colormap `cmap` represents a continuous density or scale.",
                  "![Multi-Dimensional Scatter Diagram](/matplotlib_scatter_bubble.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Prepare synthetic dataset with 4 metrics (X, Y, Color metric, Size metric).",
              "Step 2: Create figure and axes handle (`fig, ax = plt.subplots()`).",
              "Step 3: Call `scatter = ax.scatter(x, y, c=color_var, s=size_var, cmap='viridis', alpha=0.75)`.",
              "Step 4: Attach colorbar legend using `cbar = fig.colorbar(scatter, ax=ax)`.",
              "Step 5: Add title, x-label, y-label, colorbar label, and gridlines.",
              "Step 6: Render visualization using `plt.show()`."
            ],
            pretest: [
              {
                question: "In `ax.scatter()`, which parameter maps numerical values to marker areas?",
                options: ["size", "s", "radius", "area"],
                answerIndex: 1,
                hint: "`s` takes scalar values or arrays representing point marker size squared."
              },
              {
                question: "How do you attach a colorbar scale to a scatter plot in Matplotlib?",
                options: ["ax.add_colorbar()", "fig.colorbar(scatter_object, ax=ax)", "plt.show_color()", "scatter.colorbar()"],
                answerIndex: 1,
                hint: "`fig.colorbar()` takes the scalar mappable scatter object and target axes."
              }
            ],
            posttest: [
              {
                question: "What parameter controls marker transparency to resolve overlapping points?",
                options: ["opacity", "transparency", "alpha", "blend"],
                answerIndex: 2,
                hint: "`alpha` ranges from 0.0 (transparent) to 1.0 (opaque)."
              },
              {
                question: "What type of Matplotlib object does `fig.colorbar()` require as input?",
                options: ["Axes instance", "ScalarMappable object (like scatter result)", "List of colors", "DataFrame"],
                answerIndex: 1,
                hint: "It requires a ScalarMappable object containing colormap mapping data."
              }
            ],
            references: [
              "Matplotlib Scatter Plot Documentation — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.scatter.html"
            ]
          }
        },
        {
          id: "dv-mpl-e5",
          title: "Statistical Summary & Error Analysis: Box Plots & Error Bars",
          desc: "Evaluate five-number statistical summaries using ax.boxplot and express measurement uncertainties using ax.errorbar with error caps.",
          expected: "A dual-panel figure displaying group boxplots with notched medians alongside line charts with standard deviation error bars.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Generate group execution time distributions
np.random.seed(42)
algo_a = np.random.normal(45, 8, 100)
algo_b = np.random.normal(52, 12, 100)
algo_c = np.random.normal(38, 5, 100)

data_groups = [algo_a, algo_b, algo_c]
labels = ['Algorithm A', 'Algorithm B', 'Algorithm C']

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 1. Notched Box Plot with Custom Styling
box = ax1.boxplot(
    data_groups, 
    labels=labels, 
    notch=True, 
    patch_artist=True,
    boxprops=dict(facecolor='#e0f2fe', color='#0284c7', linewidth=1.5),
    medianprops=dict(color='#e11d48', linewidth=2),
    whiskerprops=dict(color='#0284c7', linewidth=1.5),
    capprops=dict(color='#0284c7', linewidth=1.5),
    flierprops=dict(marker='o', markerfacecolor='#d97706', markersize=6)
)
ax1.set_title('Algorithm Latency Summary (Boxplot)', fontsize=12, fontweight='bold')
ax1.set_ylabel('Execution Time (ms)')
ax1.grid(True, linestyle=':', alpha=0.6)

# 2. Line Plot with Error Bars (Mean ± Std Dev)
means = [np.mean(g) for g in data_groups]
stds = [np.std(g) for g in data_groups]
x_pos = np.arange(len(labels))

ax2.errorbar(
    x_pos, 
    means, 
    yerr=stds, 
    fmt='-o', 
    color='#0d9488', 
    ecolor='#e11d48', 
    capsize=6, 
    capthick=2, 
    linewidth=2, 
    markersize=8, 
    label='Mean ± 1 Std Dev'
)
ax2.set_title('Mean Performance with Uncertainty', fontsize=12, fontweight='bold')
ax2.set_xticks(x_pos)
ax2.set_xticklabels(labels)
ax2.set_ylabel('Execution Time (ms)')
ax2.legend()
ax2.grid(True, linestyle=':', alpha=0.6)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To perform statistical distribution and error evaluation using box plots and error bars.",
              bullets: [
                "Construct five-number summary boxplots (Q1, Median, Q3, Whiskers, Outliers) using `ax.boxplot()`.",
                "Custom-style box patches (`patch_artist=True`), median lines, and outlier fliers.",
                "Display standard deviations and confidence margins using `ax.errorbar()`."
              ]
            },
            theory: [
              {
                title: "Box Plot Anatomy & Uncertainty Representation",
                body: [
                  "A box plot visualizes five key metrics: 1) Median (50th percentile red line), 2) Interquartile Range box (25th Q1 to 75th Q3 percentiles), 3) Whiskers (1.5 × IQR boundary), and 4) Outliers (fliers beyond whiskers).",
                  "`ax.errorbar(x, y, yerr, capsize)` renders point estimates alongside uncertainty margins.",
                  "![Boxplot and Errorbar Diagram](/matplotlib_boxplot_errorbar.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Define group metrics data arrays and compute mean/std summary statistics.",
              "Step 2: Create a 1x2 layout with `fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))`.",
              "Step 3: Call `ax1.boxplot()` with `notch=True` and `patch_artist=True` to fill box patches.",
              "Step 4: Custom-style box facecolors, median lines, and outlier fliers.",
              "Step 5: Call `ax2.errorbar()` on subplot 2 with `yerr=stds` and `capsize=6`.",
              "Step 6: Apply titles, axis labels, gridlines, `plt.tight_layout()`, and display with `plt.show()`."
            ],
            pretest: [
              {
                question: "What parameter must be set to `True` in `ax.boxplot()` to enable colored box fills?",
                options: ["fill_box", "patch_artist", "color_fill", "solid_box"],
                answerIndex: 1,
                hint: "`patch_artist=True` converts default line boxes into filled Patch objects."
              },
              {
                question: "In `ax.errorbar()`, what parameter controls the horizontal bar width at line ends?",
                options: ["capsize", "barwidth", "errwidth", "topsize"],
                answerIndex: 0,
                hint: "`capsize` specifies the end cap width in points."
              }
            ],
            posttest: [
              {
                question: "What statistical boundary do the upper and lower edges of a boxplot box represent?",
                options: ["Min and Max", "Mean ± 1 Std Dev", "25th percentile (Q1) and 75th percentile (Q3)", "0 and 100%"],
                answerIndex: 2,
                hint: "The box encompasses the central 50% Interquartile Range (IQR)."
              },
              {
                question: "What points are classified as 'fliers' in a boxplot?",
                options: ["Values inside the IQR", "Median points", "Outliers positioned beyond 1.5 × IQR from box edges", "Mean values"],
                answerIndex: 2,
                hint: "Fliers represent extreme outlier data points."
              }
            ],
            references: [
              "Matplotlib Boxplot Guide — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.boxplot.html"
            ]
          }
        },
        {
          id: "dv-mpl-e6",
          title: "Specialized Visualizations: Stem, Step, Fill-Between & Polar Plots",
          desc: "Create specialized charts including discrete stem plots (ax.stem), step charts (ax.step), filled area charts (ax.fill_between), and polar coordinate plots (projection='polar').",
          expected: "A 2x2 multi-panel layout illustrating discrete stem impulses, step function responses, fill-between confidence bands, and polar coordinate spirals.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Data generation
t = np.linspace(0, 2 * np.pi, 50)
y_signal = np.sin(t) * np.exp(-0.2 * t)

fig = plt.figure(figsize=(10, 8))

# 1. Discrete Stem Plot
ax1 = fig.add_subplot(2, 2, 1)
ax1.stem(t, y_signal, linefmt='-b', markerfmt='ob', basefmt='r-')
ax1.set_title('1. Discrete Stem Impulse Signal', fontsize=11, fontweight='bold')
ax1.grid(True, linestyle=':', alpha=0.5)

# 2. Step Plot
ax2 = fig.add_subplot(2, 2, 2)
ax2.step(t, y_signal, where='mid', color='#0d9488', linewidth=2)
ax2.set_title('2. Step Function (where="mid")', fontsize=11, fontweight='bold')
ax2.grid(True, linestyle=':', alpha=0.5)

# 3. Fill-Between Area Chart
ax3 = fig.add_subplot(2, 2, 3)
y_upper = y_signal + 0.2
y_lower = y_signal - 0.2
ax3.plot(t, y_signal, color='#0284c7', linewidth=2, label='Mean Signal')
ax3.fill_between(t, y_lower, y_upper, color='#0284c7', alpha=0.25, label='Confidence Interval')
ax3.set_title('3. Fill-Between Region', fontsize=11, fontweight='bold')
ax3.legend()
ax3.grid(True, linestyle=':', alpha=0.5)

# 4. Polar Coordinates Plot
theta = np.linspace(0, 4 * np.pi, 200)
r = theta**2
ax4 = fig.add_subplot(2, 2, 4, projection='polar')
ax4.plot(theta, r, color='#d97706', linewidth=2)
ax4.set_title('4. Polar Spiral Chart', fontsize=11, fontweight='bold', pad=15)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To build specialized visualization charts including stem, step, fill-between area, and polar plots.",
              bullets: [
                "Plot discrete sampled signals using `ax.stem()`.",
                "Display step functions using `ax.step()`.",
                "Shade error bounds or area thresholds using `ax.fill_between()`.",
                "Create polar coordinate plots using `projection='polar'`."
              ]
            },
            theory: [
              {
                title: "Specialized Plot Types",
                body: [
                  "`ax.stem()` renders discrete sample lines extending from a baseline. `ax.step()` renders step functions useful for digital state changes.",
                  "`ax.fill_between(x, y1, y2, alpha)` shades the region between two curves. `projection='polar'` creates a radial coordinate system.",
                  "![Specialized Plots Diagram](/matplotlib_specialized_plots.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Generate discrete sample arrays `t` and signal values `y_signal`.",
              "Step 2: Initialize a 2x2 subplot grid using `fig = plt.figure(figsize=(10, 8))`.",
              "Step 3: Plot discrete stem lines on subplot 1 using `ax1.stem()`.",
              "Step 4: Plot step function on subplot 2 using `ax2.step(where='mid')`.",
              "Step 5: Plot confidence interval area on subplot 3 using `ax3.fill_between()`.",
              "Step 6: Add polar subplot 4 using `fig.add_subplot(2, 2, 4, projection='polar')` and plot spiral curve.",
              "Step 7: Apply `plt.tight_layout()` and display with `plt.show()`."
            ],
            pretest: [
              {
                question: "How do you create a polar coordinate subplot in Matplotlib?",
                options: [
                  "Use `ax.set_polar()`",
                  "Pass `projection='polar'` when creating the subplot",
                  "Call `plt.polar_grid()`",
                  "Set `type='polar'`"
                ],
                answerIndex: 1,
                hint: "`projection='polar'` initializes radial coordinate transformation."
              },
              {
                question: "Which function is used to shade regions between upper and lower boundary curves?",
                options: ["ax.shade()", "ax.fill_between()", "ax.color_region()", "ax.fill_area()"],
                answerIndex: 1,
                hint: "`ax.fill_between(x, y1, y2)` fills between two y arrays."
              }
            ],
            posttest: [
              {
                question: "What does the `where` parameter in `ax.step()` specify?",
                options: [
                  "Subplot position",
                  "Whether step transitions occur at 'pre', 'post', or 'mid' point of x intervals",
                  "Condition for filtering data",
                  "Line color"
                ],
                answerIndex: 1,
                hint: "It dictates step edge placement along the X-axis."
              },
              {
                question: "In `ax.stem()`, what line formats are customized?",
                options: ["linefmt, markerfmt, basefmt", "color, width, style", "top, bottom, left", "x, y, z"],
                answerIndex: 0,
                hint: "Stem plots accept formatting parameters for stems, markers, and baseline."
              }
            ],
            references: [
              "Matplotlib Polar Plots — https://matplotlib.org/stable/gallery/pie_custom_and_legend/polar_bar.html"
            ]
          }
        }
      ]
    },
    {
      title: "Module 3: Multi-Panel Subplots, GridSpec & Twin Axes Systems",
      objective: "Design multi-panel dashboard layouts using subplots, GridSpec layout managers, and dual-scale twin axes systems.",
      tutorial: "Tutorial 3: Advanced Layout Management & Multi-Panel Coordination",
      labTitle: "Lab 3: GridSpec Dashboards and Twin Axes Integration",
      experiments: [
        {
          id: "dv-mpl-e7",
          title: "Multi-Panel Layouts, GridSpec & Twin Axes Systems",
          desc: "Construct multi-panel dashboards using GridSpec for uneven subplot sizes and twinx() for overlaying dual metrics with different scales on a shared X-axis.",
          expected: "A multi-panel executive dashboard featuring a main span chart with dual Y-axes alongside secondary distribution panels.",
          code: `import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np

# Business metrics data
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
ad_spend = [12, 15, 18, 22, 28, 35]         # in $k (Left Y-axis)
conversions = [320, 410, 520, 680, 890, 1150] # count (Right Y-axis)

fig = plt.figure(figsize=(10, 7))
gs = gridspec.GridSpec(2, 2, figure=fig, height_ratios=[1.2, 1.0])

# 1. Top Panel: Shared X-axis Twin Y-Axes Chart
ax_main = fig.add_subplot(gs[0, :])
ax_twin = ax_main.twinx()

p1 = ax_main.bar(months, ad_spend, color='#0284c7', alpha=0.6, width=0.4, label='Ad Spend ($k)')
p2 = ax_twin.plot(months, conversions, color='#e11d48', marker='o', linewidth=2.5, label='Conversions')

ax_main.set_title('Marketing Campaign Performance (Dual Y-Axis)', fontsize=12, fontweight='bold')
ax_main.set_ylabel('Ad Spend ($k)', color='#0284c7', fontweight='bold')
ax_twin.set_ylabel('Conversions (Count)', color='#e11d48', fontweight='bold')
ax_main.grid(True, linestyle=':', alpha=0.5)

# Combine legends from both axes
lines1, labels1 = ax_main.get_legend_handles_labels()
lines2, labels2 = ax_twin.get_legend_handles_labels()
ax_main.legend(lines1 + lines2, labels1 + labels2, loc='upper left')

# 2. Bottom Left Panel: Spend Distribution
ax_left = fig.add_subplot(gs[1, 0])
ax_left.pie(ad_spend, labels=months, autopct='%1.0f%%', colors=plt.cm.Blues(np.linspace(0.4, 0.9, 6)))
ax_left.set_title('Monthly Spend Share', fontsize=11, fontweight='bold')

# 3. Bottom Right Panel: Return on Investment Line
ax_right = fig.add_subplot(gs[1, 1])
roi = np.array(conversions) / np.array(ad_spend)
ax_right.plot(months, roi, color='#0d9488', marker='s', linewidth=2)
ax_right.set_title('Conversion ROI (Conversions/$k)', fontsize=11, fontweight='bold')
ax_right.set_ylabel('ROI Ratio')
ax_right.grid(True, linestyle=':', alpha=0.5)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To construct multi-panel dashboards using GridSpec and dual-scale twin axes (`ax.twinx()`).",
              bullets: [
                "Design uneven multi-panel dashboard layouts using `matplotlib.gridspec.GridSpec`.",
                "Overlay two distinct scale metrics on a shared X-axis using `ax.twinx()`.",
                "Consolidate handle legends from twin axes into a single legend box."
              ]
            },
            theory: [
              {
                title: "GridSpec Layout Manager & Twin Axes Architecture",
                body: [
                  "`GridSpec(nrows, ncols, height_ratios)` grants complete freedom over subplot placement, allowing single plots to span multiple columns or rows.",
                  "`ax.twinx()` creates an overlapping twin axes sharing the X-axis, enabling independent Y-axis scaling for metrics with different units (e.g. currency vs count).",
                  "![GridSpec and Twin Axes Diagram](/matplotlib_gridspec_twinx.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Define time-series marketing dataset with spend ($) and conversions count.",
              "Step 2: Create a Figure handle and instantiate a `GridSpec(2, 2, height_ratios=[1.2, 1.0])`.",
              "Step 3: Add main top subplot spanning both columns (`ax_main = fig.add_subplot(gs[0, :])`).",
              "Step 4: Create twin Y-axis on main plot using `ax_twin = ax_main.twinx()`.",
              "Step 5: Plot bars on `ax_main` and line on `ax_twin`, then combine legends.",
              "Step 6: Add bottom left and bottom right subplots to `gs[1, 0]` and `gs[1, 1]`.",
              "Step 7: Apply `plt.tight_layout()` and display with `plt.show()`."
            ],
            pretest: [
              {
                question: "What function creates a twin Y-axis sharing the same X-axis in Matplotlib?",
                options: ["ax.sharex()", "ax.twinx()", "ax.secondary_y()", "fig.dual_y()"],
                answerIndex: 1,
                hint: "`ax.twinx()` generates an overlapping axes sharing the X domain."
              },
              {
                question: "How do you specify a subplot spanning all columns of row 0 in GridSpec?",
                options: ["gs[0, 0:all]", "gs[0, :]", "gs[0, 1..2]", "gs.span_row(0)"],
                answerIndex: 1,
                hint: "Python slice syntax `gs[0, :]` selects all column indices."
              }
            ],
            posttest: [
              {
                question: "How can legends from twin axes (`ax1` and `ax2`) be combined into a single legend?",
                options: [
                  "Call `plt.combine_legends()`",
                  "Concatenate handles and labels: `ax1.legend(handles1 + handles2, labels1 + labels2)`",
                  "Set `twin_legend=True`",
                  "It happens automatically"
                ],
                answerIndex: 1,
                hint: "Extract handles/labels from both axes and combine them in one legend call."
              },
              {
                question: "What parameter in `GridSpec` controls relative vertical row heights?",
                options: ["row_scale", "height_ratios", "row_weights", "v_expand"],
                answerIndex: 1,
                hint: "`height_ratios` accepts a list of relative height multipliers."
              }
            ],
            references: [
              "Matplotlib GridSpec Guide — https://matplotlib.org/stable/tutorials/intermediate/gridspec.html",
              "Matplotlib Twin Axes — https://matplotlib.org/stable/gallery/subplots_axes_and_figures/two_scales.html"
            ]
          }
        }
      ]
    },
    {
      title: "Module 4: Advanced Styling, Heatmaps & Publication Exports",
      objective: "Customize low-level plot elements (spines, annotations), render matrix heatmaps, apply global style sheets, and export high-resolution publication figures.",
      tutorial: "Tutorial 4: Advanced Aesthetic Control, Spines, Annotations & Figure Export",
      labTitle: "Lab 4: Heatmaps, Spines, Annotations and Image Export",
      experiments: [
        {
          id: "dv-mpl-e8",
          title: "Advanced Customization: Spines Control, Text Annotations & Legend Anchoring",
          desc: "Customize low-level aesthetic elements including spine positioning, text annotations with pointer arrows (ax.annotate), and custom legend anchoring (bbox_to_anchor).",
          expected: "A figure with centered zero-spines, top/right borders removed, annotated peak points with curved arrow pointers, and custom styled legend.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Generate damped wave dataset
x = np.linspace(0, 10, 200)
y = np.exp(-0.3 * x) * np.sin(2 * np.pi * 0.5 * x)

fig, ax = plt.subplots(figsize=(8, 5))

ax.plot(x, y, color='#0284c7', linewidth=2.5, label=r'$y = e^{-0.3x} \\sin(\\pi x)$')

# 1. Custom Spine Control: Remove Top and Right Spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# 2. Position X and Y Spines at Zero origin
ax.spines['bottom'].set_position('zero')
ax.spines['left'].set_position(('data', 0))

# 3. Add Peak Annotation with Arrow Pointer
x_peak = 0.45
y_peak = np.exp(-0.3 * x_peak) * np.sin(2 * np.pi * 0.5 * x_peak)

ax.annotate(
    f'Primary Peak ({x_peak:.2f}, {y_peak:.2f})',
    xy=(x_peak, y_peak),
    xytext=(x_peak + 1.5, y_peak + 0.3),
    arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='#e11d48', lw=1.8),
    fontsize=10,
    fontweight='bold',
    color='#e11d48'
)

# 4. Custom Legend Anchoring outside plot
ax.legend(loc='upper right', bbox_to_anchor=(1.0, 1.15), frameon=True, facecolor='white', edgecolor='#cbd5e1')

ax.set_title('Damped Harmonic Wave with Custom Spines & Annotation', fontsize=12, fontweight='bold', pad=25)
ax.grid(True, linestyle=':', alpha=0.5)

plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To control spines positioning, create text annotations with arrow pointers, and anchor custom legends.",
              bullets: [
                "Hide top/right spines and center bottom/left spines at zero using `ax.spines`.",
                "Annotate specific data coordinates with pointer arrows using `ax.annotate()`.",
                "Anchor custom legends precisely using `bbox_to_anchor`."
              ]
            },
            theory: [
              {
                title: "Spine Control & Text Annotations",
                body: [
                  "Spines are the four box borders ('top', 'bottom', 'left', 'right'). Hiding top and right spines produces a clean modern visual. Centering spines at zero aligns axes with the mathematical origin.",
                  "`ax.annotate(text, xy, xytext, arrowprops)` connects a label at `xytext` to a data coordinate `xy` via an arrow.",
                  "![Spine and Annotation Diagram](/matplotlib_spines_annotation.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Compute damped wave function data points over domain `x`.",
              "Step 2: Initialize figure and single axes.",
              "Step 3: Hide top and right spines: `ax.spines['top'].set_visible(False)`.",
              "Step 4: Move bottom spine to zero position: `ax.spines['bottom'].set_position('zero')`.",
              "Step 5: Identify peak point and add text annotation with arrow using `ax.annotate()`.",
              "Step 6: Anchor custom styled legend using `loc='upper right'` and `bbox_to_anchor`.",
              "Step 7: Apply `plt.tight_layout()` and display plot with `plt.show()`."
            ],
            pretest: [
              {
                question: "In `ax.annotate()`, what does the `xy` parameter specify?",
                options: ["Position of text label", "Data point coordinate to point at", "Arrow thickness", "Subplot position"],
                answerIndex: 1,
                hint: "`xy` is the target data coordinate being annotated."
              },
              {
                question: "How do you hide the top border spine of a plot?",
                options: ["ax.spines['top'].set_visible(False)", "ax.remove_top()", "plt.hide_spine('top')", "ax.top.visible = 0"],
                answerIndex: 0,
                hint: "`ax.spines['top'].set_visible(False)` hides the top bounding spine line."
              }
            ],
            posttest: [
              {
                question: "What parameter in `ax.legend()` enables positioning the legend outside plot bounds?",
                options: ["outer_loc", "bbox_to_anchor", "external_pos", "anchor_box"],
                answerIndex: 1,
                hint: "`bbox_to_anchor` anchors the legend box relative to axes bounding box coordinates."
              },
              {
                question: "In `ax.annotate()`, what parameter specifies text label placement?",
                options: ["xy", "xytext", "text_coord", "label_pos"],
                answerIndex: 1,
                hint: "`xytext` defines where the text string is placed."
              }
            ],
            references: [
              "Matplotlib Annotations — https://matplotlib.org/stable/tutorials/text/annotations.html",
              "Matplotlib Spines Tutorial — https://matplotlib.org/stable/api/spines_api.html"
            ]
          }
        },
        {
          id: "dv-mpl-e9",
          title: "Matrix & Heatmap Visualizations using imshow",
          desc: "Visualize 2D matrices, correlation matrices, and spatial grids using ax.imshow, configuring colormaps, normalizations, cell text overlays, and colorbars.",
          expected: "A correlation matrix heatmap displaying feature relationships with numeric text overlay values inside each cell.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# Feature correlation matrix data
features = ['Age', 'Income', 'Education', 'Spending', 'CreditScore']
corr_matrix = np.array([
    [ 1.00,  0.65,  0.42,  0.28,  0.55],
    [ 0.65,  1.00,  0.71,  0.82,  0.68],
    [ 0.42,  0.71,  1.00,  0.49,  0.51],
    [ 0.28,  0.82,  0.49,  1.00,  0.45],
    [ 0.55,  0.68,  0.51,  0.45,  1.00]
])

fig, ax = plt.subplots(figsize=(7, 6))

# Render 2D matrix heatmap using imshow
im = ax.imshow(corr_matrix, cmap='Blues', vmin=0, vmax=1)

# Set tick labels matching feature names
ax.set_xticks(np.arange(len(features)))
ax.set_yticks(np.arange(len(features)))
ax.set_xticklabels(features, rotation=30, ha='right')
ax.set_yticklabels(features)

# Loop over matrix dimensions to overlay numerical text values
for i in range(len(features)):
    for j in range(len(features)):
        val = corr_matrix[i, j]
        text_color = 'white' if val > 0.75 else 'black'
        ax.text(j, i, f'{val:.2f}', ha='center', va='center', color=text_color, fontweight='bold')

cbar = fig.colorbar(im, ax=ax, shrink=0.8)
cbar.set_label('Pearson Correlation Coefficient', fontsize=10)

ax.set_title('Feature Correlation Matrix Heatmap', fontsize=12, fontweight='bold', pad=15)
plt.tight_layout()
plt.show()`,
          content: {
            aim: {
              text: "To render 2D tabular matrices and correlation heatmaps using `ax.imshow()` with cell text annotations.",
              bullets: [
                "Render 2D numerical matrices into visual heatmaps using `ax.imshow()`.",
                "Apply sequential colormaps (`cmap='Blues'`) and set scale bounds (`vmin`, `vmax`).",
                "Overlay text values inside matrix cells using nested coordinate loops.",
                "Attach colorbar handles to represent numerical scales."
              ]
            },
            theory: [
              {
                title: "Heatmap Matrix Rendering with imshow",
                body: [
                  "`ax.imshow(X, cmap, vmin, vmax)` maps a 2D numerical array `X` into a colored cell grid. Cell coordinates map to `(col, row)` indices.",
                  "Using nested loops over matrix shape, `ax.text(j, i, string)` places numeric cell labels. Text colors should dynamically contrast with cell fill brightness.",
                  "![Heatmap Architecture Diagram](/matplotlib_heatmap_imshow.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Define feature names and 2D correlation matrix NumPy array.",
              "Step 2: Create figure and single axes (`fig, ax = plt.subplots(figsize=(7, 6))`).",
              "Step 3: Call `im = ax.imshow(corr_matrix, cmap='Blues', vmin=0, vmax=1)`.",
              "Step 4: Set tick locations and feature label strings on X and Y axes.",
              "Step 5: Iterate through matrix rows/cols using nested loops and call `ax.text()` to display cell values.",
              "Step 6: Attach colorbar using `fig.colorbar(im, ax=ax)`.",
              "Step 7: Apply `plt.tight_layout()` and display heatmap with `plt.show()`."
            ],
            pretest: [
              {
                question: "Which Matplotlib function renders a 2D numeric matrix as a heatmap grid?",
                options: ["ax.plot_matrix()", "ax.imshow()", "ax.gridmap()", "ax.heatmap()"],
                answerIndex: 1,
                hint: "`ax.imshow()` (image show) displays 2D array data as images/heatmaps."
              },
              {
                question: "What parameters restrict the colormap color mapping boundaries in `ax.imshow()`?",
                options: ["min/max", "vmin/vmax", "bound_low/bound_high", "scale_min/scale_max"],
                answerIndex: 1,
                hint: "`vmin` and `vmax` define minimum and maximum data values mapped to colormap limits."
              }
            ],
            posttest: [
              {
                question: "In `ax.text(x, y, string)` inside an `imshow` loop, what order do coordinates take?",
                options: ["col index (j) then row index (i)", "row index (i) then col index (j)", "z index then x index", "1D index"],
                answerIndex: 0,
                hint: "X coordinate maps to column index `j`, Y coordinate maps to row index `i`."
              },
              {
                question: "Which type of colormap is best suited for correlation matrices ranging from -1.0 to +1.0?",
                options: ["Sequential (Blues)", "Diverging (Coolwarm / Seismic)", "Qualitative (Set1)", "Greys"],
                answerIndex: 1,
                hint: "Diverging colormaps highlight deviations in two directions from a neutral center (0)."
              }
            ],
            references: [
              "Matplotlib Imshow Documentation — https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.imshow.html"
            ]
          }
        },
        {
          id: "dv-mpl-e10",
          title: "Figure Export, Style Sheets & Light Theme Visual Production",
          desc: "Apply global style sheets (plt.style.use), modify runtime rcParams, optimize layout engines, and export high-resolution vector/raster figures using plt.savefig.",
          expected: "A multi-chart figure styled with custom light theme rcParams and exported as high-DPI publication graphics.",
          code: `import matplotlib.pyplot as plt
import numpy as np

# 1. Configure Global Styling with Built-in Style and Custom rcParams
plt.style.use('default')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.edgecolor'] = '#94a3b8'
plt.rcParams['axes.linewidth'] = 1.2

# Generate synthetic experimental trial data
trials = np.arange(1, 11)
accuracy_model_a = [65, 72, 78, 83, 86, 88, 90, 91, 92, 93]
accuracy_model_b = [58, 64, 71, 75, 80, 84, 85, 87, 88, 89]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5))

# Plot 1: Model Accuracy Curves
ax1.plot(trials, accuracy_model_a, color='#0284c7', marker='o', linewidth=2.2, label='ResNet Model')
ax1.plot(trials, accuracy_model_b, color='#0d9488', marker='s', linewidth=2.2, label='EfficientNet Model')
ax1.set_title('Training Convergence Accuracy', fontweight='bold')
ax1.set_xlabel('Epoch Trial')
ax1.set_ylabel('Accuracy (%)')
ax1.legend()
ax1.grid(True, linestyle=':', alpha=0.6)

# Plot 2: Epoch Final Comparison Bar Chart
models = ['ResNet', 'EfficientNet']
final_acc = [accuracy_model_a[-1], accuracy_model_b[-1]]
bars = ax2.bar(models, final_acc, color=['#0284c7', '#0d9488'], width=0.45, edgecolor='white')
ax2.bar_label(bars, fmt='%.1f%%', padding=3, fontweight='bold')
ax2.set_title('Final Benchmark Accuracy', fontweight='bold')
ax2.set_ylabel('Accuracy (%)')
ax2.set_ylim(0, 105)
ax2.grid(axis='y', linestyle=':', alpha=0.6)

# Optimize spacing layout engine
fig.set_layout_engine('constrained')

# Save High-DPI Figure Export (Simulated Export Call)
# plt.savefig('publication_benchmark.png', dpi=300, bbox_inches='tight', transparent=False)

plt.show()`,
          content: {
            aim: {
              text: "To customize global figure aesthetics using style sheets and export high-resolution publication graphics with `plt.savefig()`.",
              bullets: [
                "Apply built-in style sheets (`plt.style.use()`) and update runtime parameters (`plt.rcParams`).",
                "Optimize figure element spacing using `fig.set_layout_engine('constrained')`.",
                "Export high-DPI vector and raster graphics using `plt.savefig()`."
              ]
            },
            theory: [
              {
                title: "Matplotlib Styling Engine & High-Resolution Export",
                body: [
                  "`plt.style.use(style_name)` applies pre-configured aesthetic themes across all plots. `plt.rcParams` dictionary allows runtime customization of fonts, line widths, and grid colors.",
                  "`plt.savefig(fname, dpi, bbox_inches='tight')` exports figures to disk. Setting `dpi=300` ensures publication quality, while `bbox_inches='tight'` crops extra whitespace margins.",
                  "![Style and Export Pipeline](/matplotlib_style_export.png)"
                ]
              }
            ],
            procedure: [
              "Step 1: Set default style theme and update `plt.rcParams` font and border settings.",
              "Step 2: Prepare model training accuracy metrics arrays.",
              "Step 3: Create a 1x2 subplot layout using `fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5))`.",
              "Step 4: Plot convergence line charts on `ax1` and benchmark bars on `ax2` with value labels.",
              "Step 5: Apply `fig.set_layout_engine('constrained')` to prevent title overlapping.",
              "Step 6: Execute `plt.savefig('publication_benchmark.png', dpi=300, bbox_inches='tight')`.",
              "Step 7: Render figure with `plt.show()`."
            ],
            pretest: [
              {
                question: "What function exports a Matplotlib figure to a file on disk?",
                options: ["plt.export()", "plt.savefig()", "fig.write_image()", "ax.save()"],
                answerIndex: 1,
                hint: "`plt.savefig(filename)` exports figures in raster or vector formats."
              },
              {
                question: "What does `bbox_inches='tight'` do during figure saving?",
                options: [
                  "Compresses image size",
                  "Crops excess whitespace surrounding figure labels and titles",
                  "Removes background color",
                  "Reduces DPI resolution"
                ],
                answerIndex: 1,
                hint: "It calculates precise element bounding boxes to remove extra margins."
              }
            ],
            posttest: [
              {
                question: "How do you apply a pre-configured theme globally in Matplotlib?",
                options: ["plt.set_theme()", "plt.style.use('style_name')", "ax.apply_style()", "fig.theme()"],
                answerIndex: 1,
                hint: "`plt.style.use()` switches global Matplotlib style settings."
              },
              {
                question: "What standard DPI resolution is recommended for publication-quality raster images?",
                options: ["72 DPI", "96 DPI", "300 DPI", "1200 DPI"],
                answerIndex: 2,
                hint: "300 DPI is the industry standard for high-resolution graphics print/publication."
              }
            ],
            references: [
              "Matplotlib Savefig Documentation — https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.savefig.html",
              "Matplotlib Style Sheets — https://matplotlib.org/stable/tutorials/introductory/customizing.html"
            ]
          }
        }
      ]
    }
  ]
};
