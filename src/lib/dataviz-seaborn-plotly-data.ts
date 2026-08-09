// lib/dataviz-seaborn-plotly-data.ts

import { Course } from './course-data';
import { datavizSeabornPlotlyShortNotes } from './dataviz-seaborn-plotly-short-notes';

// Since you don't have short notes for this course yet, use empty string
// You can create a separate file later if needed

export const datavizSeabornPlotlyCourse: Course = {
  id: "data-visualization-with-seaborn-plotly",
  title: "Data Visualization with Seaborn & Plotly",
  shortNotes: datavizSeabornPlotlyShortNotes,
  objectives: [
    "To master statistical data visualization using Seaborn's high-level interface for exploring relationships, distributions, and patterns in data.",
    "To create publication-quality static, animated, and interactive visualizations using Plotly Express and Graph Objects.",
    "To build interactive dashboards and web-based visualizations with Plotly Dash.",
    "To understand and apply advanced statistical plots including pairplots, heatmaps, violin plots, and cluster maps.",
    "To create interactive 3D visualizations and geographic maps for spatial data analysis.",
    "To implement custom color palettes, themes, and styling for professional visual communication.",
    "To integrate Seaborn and Plotly visualizations into Jupyter notebooks, web applications, and reports.",
    "To develop proficiency in creating interactive dashboards for data exploration and storytelling.",
    "To understand best practices for choosing appropriate chart types based on data characteristics and audience needs."
  ],
  introduction: [
    "Seaborn and Plotly represent two powerful approaches to data visualization in Python. Seaborn, built on Matplotlib, provides a high-level interface for drawing statistical graphics that are both informative and aesthetically pleasing. It excels at exploring relationships between variables, understanding distributions, and visualizing complex datasets with minimal code. Plotly, on the other hand, brings interactive, web-based visualizations to Python, enabling users to create dynamic charts that can be explored, zoomed, panned, and hovered over for detailed information.",
    "This course bridges the gap between static statistical graphics and interactive web-based visualizations. Students will learn to leverage Seaborn's rich statistical plotting capabilities for exploratory data analysis and publication-quality figures, while also mastering Plotly's interactive features for creating dashboards and web applications. The combination of these two libraries provides a comprehensive toolkit for any data visualization task, from quick exploratory plots to sophisticated interactive dashboards.",
    "The course covers Seaborn's extensive suite of statistical plots including categorical plots, distribution plots, regression plots, and matrix plots, as well as Plotly's interactive charts including 3D visualizations, geographical maps, animated plots, and Dash applications. By the end of this course, students will be able to create professional, interactive data visualizations that effectively communicate insights to both technical and non-technical audiences."
  ],
  targetAudience: {
    primary: "Data scientists, analysts, and developers who want to create both statistical and interactive visualizations in Python.",
    prerequisites: [
      "Basic Python programming knowledge",
      "Understanding of pandas DataFrames",
      "Basic statistics and data analysis concepts",
      "Familiarity with Jupyter notebooks"
    ],
    usefulFor: [
      "Data scientists creating exploratory data analysis reports",
      "Business analysts building interactive dashboards for stakeholders",
      "Researchers publishing statistical findings with publication-quality figures",
      "Web developers integrating data visualizations into web applications"
    ]
  },
  alignment: {
    university: "Virtual Lab",
    department: "Data Science & Visualization",
    course: "Data Visualization with Seaborn & Plotly",
    credits: "L:0 T:0 P:2 C:1",
    yearSem: "Elective",
    branches: "Computer Science, AI & DS, Data Science",
    totalExperiments: "10",
    compiler: "Python, Jupyter Notebook, Plotly Dash",
    units: [
      { unit: "Module 1", topics: "Statistical Graphics with Seaborn", weeks: "Week 1-2" },
      { unit: "Module 2", topics: "Advanced Seaborn Plots", weeks: "Week 3-4" },
      { unit: "Module 3", topics: "Interactive Visualizations with Plotly", weeks: "Week 5-6" },
      { unit: "Module 4", topics: "Plotly Dash and Advanced Interactivity", weeks: "Week 7-8" }
    ]
  },
  weeks: [
    {
      title: "Week 1: Statistical Graphics with Seaborn",
      objective: "Use Seaborn to build informative statistical plots with minimal code, building on Matplotlib foundations.",
      tutorial: "Tutorial 1: Seaborn Fundamentals",
      labTitle: "Lab 1: Distribution and Categorical Plots",
      experiments: [
        {
          id: "dv-sp-e1-1",
          title: "Distribution Plots with Seaborn",
          desc: "Visualize the distribution of a single continuous variable using histplot and kdeplot.",
          expected: "A histogram overlaid with a smooth density curve.",
          code: `import seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nsns.set_theme(style="whitegrid")\ndata = np.random.normal(loc=50, scale=10, size=500)\n\nsns.histplot(data, kde=True, color="teal")\nplt.title("Distribution of Sample Data")\nplt.xlabel("Value")\nplt.show()`,
          content: {
            aim: {
              text: "Understand how Seaborn simplifies statistical distribution visualization compared to raw Matplotlib.",
              bullets: [
                "Learn the difference between histplot and kdeplot.",
                "Apply Seaborn's built-in themes for cleaner aesthetics.",
              ],
            },
            theory: [
              {
                title: "Why Seaborn?",
                body: [
                  "Seaborn is built on top of Matplotlib and provides a higher-level interface for statistical graphics.",
                  "It integrates directly with Pandas DataFrames, so columns can be passed by name.",
                  "sns.set_theme() applies consistent, publication-quality styling across all subsequent plots.",
                ],
              },
              {
                title: "histplot vs kdeplot",
                body: [
                  "histplot() bins continuous data into discrete intervals and shows frequency counts as bars.",
                  "kdeplot() estimates a smooth probability density curve, useful for seeing the overall shape of a distribution without binning artifacts.",
                  "Combining both (kde=True inside histplot) gives both granular and smoothed views simultaneously.",
                ],
              },
            ],
            pretest: [
              {
                question: "What is the primary advantage of Seaborn over raw Matplotlib?",
                options: [
                  "It runs faster",
                  "It provides a higher-level interface for statistical graphics with less code",
                  "It replaces Matplotlib entirely",
                  "It only works with CSV files",
                ],
                answerIndex: 1,
                hint: "Think about code complexity for statistical charts.",
              },
              {
                question: "Which function shows a smoothed density estimate?",
                options: ["histplot", "kdeplot", "barplot", "lineplot"],
                answerIndex: 1,
                hint: "KDE stands for Kernel Density Estimate.",
              },
            ],
            posttest: [
              {
                question: "What does sns.set_theme() do?",
                options: [
                  "Loads a dataset",
                  "Applies consistent visual styling to all plots",
                  "Creates a new DataFrame",
                  "Exports a chart to PDF",
                ],
                answerIndex: 1,
                hint: "It's a styling function, not a data function.",
              },
              {
                question: "Passing kde=True inside histplot() will:",
                options: [
                  "Remove the histogram bars",
                  "Overlay a smoothed density curve on the histogram",
                  "Convert the chart to a bar chart",
                  "Change the chart to 3D",
                ],
                answerIndex: 1,
                hint: "It adds, not replaces.",
              },
            ],
            procedure: [
              "Import seaborn and set a theme using sns.set_theme().",
              "Generate or load a numeric dataset (e.g., using NumPy random normal distribution).",
              "Call sns.histplot() with kde=True to plot both histogram and density curve.",
              "Add title and axis labels using Matplotlib functions (plt.title, plt.xlabel).",
              "Display the chart using plt.show().",
            ],
            references: [
              "Seaborn Official Documentation — https://seaborn.pydata.org",
              "Waskom, M. (2021). Seaborn: statistical data visualization. Journal of Open Source Software.",
            ],
          },
        },
        {
          id: "dv-sp-e1-2",
          title: "Categorical Plots: Box & Violin",
          desc: "Compare distributions across categories using boxplot and violinplot.",
          expected: "Side-by-side box/violin plots grouped by category.",
          code: `import seaborn as sns\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    "Region": ["North","South","East","West"]*25,\n    "Sales": [50 + i%40 for i in range(100)]\n})\n\nfig, axes = plt.subplots(1, 2, figsize=(10,4))\nsns.boxplot(x="Region", y="Sales", data=df, ax=axes[0])\nsns.violinplot(x="Region", y="Sales", data=df, ax=axes[1])\naxes[0].set_title("Box Plot")\naxes[1].set_title("Violin Plot")\nplt.tight_layout()\nplt.show()`,
          content: {
            aim: {
              text: "Compare the distribution of a numeric variable across categorical groups.",
              bullets: [
                "Understand quartiles and outliers via box plots.",
                "Interpret density shape via violin plots.",
              ],
            },
            theory: [
              {
                title: "Box Plots",
                body: [
                  "A box plot displays the median, interquartile range (IQR), and outliers of a distribution.",
                  "The box spans the 25th to 75th percentile; whiskers extend to typical min/max; points beyond are flagged as outliers.",
                ],
              },
              {
                title: "Violin Plots",
                body: [
                  "A violin plot combines a box plot with a kernel density estimate, showing the full shape of the distribution on each side.",
                  "It's especially useful when the distribution is multimodal (has more than one peak), which a box plot alone would hide.",
                ],
              },
            ],
            pretest: [
              {
                question: "What does the box in a box plot represent?",
                options: ["Mean ± std", "Interquartile range (25th–75th percentile)", "Min to max range", "Mode"],
                answerIndex: 1,
                hint: "IQR = Q3 - Q1.",
              },
            ],
            posttest: [
              {
                question: "A violin plot is preferred over a box plot when:",
                options: [
                  "The dataset has categorical labels",
                  "The distribution is multimodal and shape matters",
                  "You want a pie chart instead",
                  "The dataset has only 2 rows",
                ],
                answerIndex: 1,
                hint: "Think about what a violin plot adds over a box plot.",
              },
            ],
            procedure: [
              "Create a Pandas DataFrame with a categorical column and a numeric column.",
              "Use plt.subplots(1,2) to create two side-by-side axes.",
              "Plot sns.boxplot() on the first axis and sns.violinplot() on the second, both using x/y/data parameters.",
              "Label each subplot with set_title().",
              "Call plt.tight_layout() and plt.show().",
            ],
            references: ["Seaborn Categorical Plots Guide — https://seaborn.pydata.org/tutorial/categorical.html"],
          },
        },
        {
          id: "dv-sp-e1-3",
          title: "Relational Plots with Hue and Style",
          desc: "Use scatterplot and lineplot with the hue and style parameters to encode extra dimensions.",
          expected: "A scatter plot where color and marker shape encode two categorical variables.",
          code: `import seaborn as sns\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(1)\ndf = pd.DataFrame({\n    "x": np.random.rand(100),\n    "y": np.random.rand(100),\n    "category": np.random.choice(["A","B","C"], 100),\n    "group": np.random.choice(["G1","G2"], 100)\n})\n\nsns.scatterplot(x="x", y="y", hue="category", style="group", data=df, s=80)\nplt.title("Multi-dimensional Scatter Plot")\nplt.show()`,
          content: {
            aim: {
              text: "Encode multiple variables in a single 2D plot using color and marker style.",
              bullets: [
                "Use hue to encode a categorical color dimension.",
                "Use style to encode a second categorical dimension via marker shape."
              ]
            },
            theory: [
              {
                title: "Encoding Extra Dimensions",
                body: [
                  "Beyond x and y position, Seaborn lets you map additional variables to color (hue), marker shape (style), and size (size) — turning a 2D scatter plot into a richer multi-dimensional view.",
                  "This is especially useful in exploratory data analysis when checking how a third categorical factor interacts with two numeric variables."
                ]
              }
            ],
            pretest: [
              {
                question: "Which Seaborn parameter maps a variable to marker shape?",
                options: ["hue", "style", "size", "palette"],
                answerIndex: 1,
                hint: "Shape, not color."
              }
            ],
            posttest: [
              {
                question: "The hue parameter in sns.scatterplot() controls:",
                options: ["Marker size", "Point color grouping", "Axis scale", "Legend position"],
                answerIndex: 1,
                hint: "Hue relates to color."
              }
            ],
            procedure: [
              "Build a DataFrame with two numeric columns and two categorical columns.",
              "Call sns.scatterplot() passing hue for one categorical column and style for the other.",
              "Observe how Seaborn auto-generates a combined legend.",
              "Add a title and display the plot."
            ],
            references: ["Seaborn Relational Plots — https://seaborn.pydata.org/tutorial/relational.html"],
          },
        },
      ],
    },
    {
      title: "Week 2: Advanced Seaborn — Correlation & Multi-Panel Views",
      objective: "Use heatmaps, pairplots, and FacetGrids for deeper multi-variable exploratory analysis.",
      tutorial: "Tutorial 2: Advanced Seaborn",
      labTitle: "Lab 2: Heatmaps, Pairplots, and FacetGrid",
      experiments: [
        {
          id: "dv-sp-e2-1",
          title: "Correlation Heatmaps",
          desc: "Visualize a correlation matrix using sns.heatmap().",
          expected: "A color-coded correlation matrix with annotated values.",
          code: `import seaborn as sns\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(0)\ndf = pd.DataFrame(np.random.rand(50,4), columns=["A","B","C","D"])\ncorr = df.corr()\n\nsns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)\nplt.title("Correlation Heatmap")\nplt.show()`,
          content: {
            aim: {
              text: "Learn to visualize pairwise correlations between numeric variables using color intensity.",
              bullets: [
                "Compute a correlation matrix with df.corr().",
                "Render it with sns.heatmap() using annotations."
              ]
            },
            theory: [
              {
                title: "Reading a Heatmap",
                body: [
                  "A correlation heatmap maps correlation coefficients (-1 to 1) to color intensity, making it easy to spot strongly related variable pairs at a glance.",
                  "annot=True overlays the numeric value on each cell; cmap='coolwarm' uses a diverging color scheme so positive and negative correlations are visually distinct."
                ]
              }
            ],
            pretest: [
              {
                question: "A correlation value close to -1 indicates:",
                options: ["No relationship", "Strong positive relationship", "Strong negative (inverse) relationship", "Missing data"],
                answerIndex: 2,
                hint: "Negative sign means inverse."
              }
            ],
            posttest: [
              {
                question: "What does annot=True do in sns.heatmap()?",
                options: ["Rotates labels", "Displays numeric values inside each cell", "Adds a legend", "Changes color scheme"],
                answerIndex: 1,
                hint: "Annotation = text labels."
              }
            ],
            procedure: [
              "Create a DataFrame with several numeric columns.",
              "Compute the correlation matrix using df.corr().",
              "Plot it with sns.heatmap(corr, annot=True, cmap='coolwarm').",
              "Interpret which variable pairs are strongly correlated."
            ],
            references: ["Seaborn Heatmap Docs — https://seaborn.pydata.org/generated/seaborn.heatmap.html"]
          },
        },
        {
          id: "dv-sp-e2-2",
          title: "Pairplots for Multi-Variable EDA",
          desc: "Use sns.pairplot() to visualize pairwise relationships across an entire dataset at once.",
          expected: "A grid of scatter plots and histograms across all variable pairs.",
          code: `import seaborn as sns\nimport pandas as pd\n\ndf = sns.load_dataset("iris")\nsns.pairplot(df, hue="species")\nimport matplotlib.pyplot as plt\nplt.show()`,
          content: {
            aim: {
              text: "Quickly explore relationships between every pair of numeric variables in a dataset.",
              bullets: [
                "Use pairplot to generate a full grid of scatter plots.",
                "Use hue to color by a categorical grouping variable."
              ]
            },
            theory: [
              {
                title: "The Pairplot Grid",
                body: [
                  "pairplot() creates an N x N grid where each cell shows either a scatter plot (off-diagonal) or a distribution plot (diagonal) for each pair of numeric columns.",
                  "This is one of the fastest ways to do initial exploratory data analysis (EDA) before deciding which relationships deserve deeper investigation."
                ]
              }
            ],
            pretest: [
              {
                question: "What appears on the diagonal of a pairplot by default?",
                options: ["Scatter plots", "Distribution/histogram plots", "Empty cells", "Box plots"],
                answerIndex: 1,
                hint: "Diagonal compares a variable to itself."
              }
            ],
            posttest: [
              {
                question: "Adding hue='species' to pairplot() will:",
                options: ["Remove the diagonal plots", "Color points by category across all subplots", "Only affect one subplot", "Convert to a heatmap"],
                answerIndex: 1,
                hint: "Hue affects the whole grid consistently."
              }
            ],
            procedure: [
              "Load or construct a DataFrame with multiple numeric columns and one categorical column.",
              "Call sns.pairplot(df, hue='category_column').",
              "Examine the grid to identify variable pairs with visible separation or correlation.",
              "Display with plt.show()."
            ],
            references: ["Seaborn Pairplot Docs — https://seaborn.pydata.org/generated/seaborn.pairplot.html"]
          },
        },
        {
          id: "dv-sp-e2-3",
          title: "FacetGrid: Small Multiples",
          desc: "Split a dataset into multiple small charts (facets) based on a categorical variable using FacetGrid.",
          expected: "A grid of mini line/histogram charts, one per category.",
          code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset("tips")\ng = sns.FacetGrid(df, col="time", row="smoker")\ng.map(sns.histplot, "total_bill")\nplt.show()`,
          content: {
            aim: {
              text: "Break a complex dataset into a grid of simpler charts, one per category combination (small multiples).",
              bullets: [
                "Understand the 'small multiples' design principle.",
                "Use FacetGrid to split by row and column categories."
              ]
            },
            theory: [
              {
                title: "Small Multiples",
                body: [
                  "The 'small multiples' technique repeats the same basic chart across different subsets of data (facets), making comparison across categories easy without cluttering a single chart.",
                  "FacetGrid takes row and col parameters to define the grid structure, then .map() applies a plotting function to each facet."
                ]
              }
            ],
            pretest: [
              {
                question: "What design principle does FacetGrid implement?",
                options: ["3D visualization", "Small multiples", "Color blending", "Data compression"],
                answerIndex: 1,
                hint: "Repeating simple charts side by side."
              }
            ],
            posttest: [
              {
                question: "The .map() method on a FacetGrid object:",
                options: ["Loads external map data", "Applies a plotting function to every facet", "Deletes empty facets", "Only works with heatmaps"],
                answerIndex: 1,
                hint: "It maps a function across facets."
              }
            ],
            procedure: [
              "Load a dataset with at least two categorical columns suitable for faceting.",
              "Create a FacetGrid specifying row and col categorical variables.",
              "Call g.map() with a plotting function (e.g., sns.histplot) and the numeric column to plot.",
              "Display the resulting grid with plt.show()."
            ],
            references: ["Seaborn FacetGrid Docs — https://seaborn.pydata.org/generated/seaborn.FacetGrid.html"]
          },
        },
      ],
    },
    {
      title: "Week 3: Interactive Visualization with Plotly",
      objective: "Build interactive, web-ready charts with hover tooltips, zoom, and geographic maps using Plotly Express.",
      tutorial: "Tutorial 3: Plotly Express",
      labTitle: "Lab 3: Interactive Charts with Plotly",
      experiments: [
        {
          id: "dv-sp-e3-1",
          title: "Interactive Charts with Plotly Express",
          desc: "Create interactive line, bar, and scatter charts with built-in hover tooltips.",
          expected: "An interactive chart the user can hover, zoom, and pan.",
          code: `import plotly.express as px\nimport pandas as pd\n\ndf = pd.DataFrame({\n    "Month": ["Jan","Feb","Mar","Apr","May"],\n    "Revenue": [1200, 1500, 1100, 1800, 2000]\n})\n\nfig = px.line(df, x="Month", y="Revenue", title="Monthly Revenue", markers=True)\nfig.show()`,
          content: {
            aim: {
              text: "Understand how Plotly differs from Matplotlib/Seaborn by producing interactive, browser-based charts.",
              bullets: [
                "Create a line chart with px.line().",
                "Enable hover tooltips and zooming automatically."
              ]
            },
            theory: [
              {
                title: "Static vs Interactive Visualization",
                body: [
                  "Matplotlib and Seaborn produce static images, ideal for reports and print.",
                  "Plotly renders charts as interactive HTML/JavaScript objects — users can hover for exact values, zoom into regions, and pan — making it ideal for dashboards and exploratory web apps.",
                  "Plotly Express (px) is the high-level API, similar in spirit to Seaborn, requiring minimal code for common chart types."
                ]
              }
            ],
            pretest: [
              {
                question: "The main advantage of Plotly over Matplotlib is:",
                options: ["Faster rendering only", "Built-in interactivity (hover, zoom, pan)", "Smaller file sizes", "It requires no Python"],
                answerIndex: 1,
                hint: "Think about user interaction."
              }
            ],
            posttest: [
              {
                question: "px.line() belongs to which Plotly module?",
                options: ["plotly.graph_objects", "plotly.express", "plotly.io", "plotly.figure_factory"],
                answerIndex: 1,
                hint: "It's the high-level express API."
              }
            ],
            procedure: [
              "Import plotly.express as px.",
              "Build a small Pandas DataFrame with a time-based column and a numeric column.",
              "Call px.line() with x, y, and title parameters.",
              "Call fig.show() and interact with the chart (hover/zoom) to observe interactivity."
            ],
            references: ["Plotly Express Documentation — https://plotly.com/python/plotly-express/"]
          },
        },
        {
          id: "dv-sp-e3-2",
          title: "Geospatial Choropleth Maps",
          desc: "Visualize numeric data across geographic regions using px.choropleth().",
          expected: "A world/country map shaded by a numeric value.",
          code: `import plotly.express as px\nimport pandas as pd\n\ndf = pd.DataFrame({\n    "country": ["India","United States","Germany","Brazil"],\n    "value": [80, 95, 70, 60]\n})\n\nfig = px.choropleth(df, locations="country", locationmode="country names",\n                     color="value", title="Sample Choropleth Map")\nfig.show()`,
          content: {
            aim: {
              text: "Represent numeric data across geographic regions using color-coded maps.",
              bullets: [
                "Understand what a choropleth map is.",
                "Use px.choropleth() with country-level data."
              ]
            },
            theory: [
              {
                title: "Choropleth Maps",
                body: [
                  "A choropleth map shades geographic regions (countries, states) according to a numeric value, making spatial patterns immediately visible.",
                  "locationmode determines how location names are matched (e.g., 'country names', ISO codes); color maps the numeric column to a color scale."
                ]
              }
            ],
            pretest: [
              {
                question: "A choropleth map encodes data using:",
                options: ["Marker size", "Region shading/color", "Line thickness", "3D height"],
                answerIndex: 1,
                hint: "Think 'color-filled regions'."
              }
            ],
            posttest: [
              {
                question: "locationmode='country names' means Plotly will match locations by:",
                options: ["Latitude/longitude only", "Exact country name strings", "Postal codes", "IP addresses"],
                answerIndex: 1,
                hint: "It reads the plain country name."
              }
            ],
            procedure: [
              "Build a DataFrame with a country column and a numeric value column.",
              "Call px.choropleth() specifying locations, locationmode, and color.",
              "Add a title and call fig.show().",
              "Hover over regions to inspect exact values."
            ],
            references: ["Plotly Maps Documentation — https://plotly.com/python/maps/"]
          },
        },
        {
          id: "dv-sp-e3-3",
          title: "3D Scatter & Bubble Charts",
          desc: "Visualize three or four dimensions at once using 3D scatter and bubble size encoding.",
          expected: "A rotatable 3D scatter plot with bubble sizes representing a fourth variable.",
          code: `import plotly.express as px\nimport pandas as pd\nimport numpy as np\n\nnp.random.seed(2)\ndf = pd.DataFrame({\n    "x": np.random.rand(50)*100,\n    "y": np.random.rand(50)*100,\n    "z": np.random.rand(50)*100,\n    "size": np.random.rand(50)*40 + 10,\n    "category": np.random.choice(["A","B"], 50)\n})\n\nfig = px.scatter_3d(df, x="x", y="y", z="z", size="size", color="category",\n                     title="3D Bubble Scatter")\nfig.show()`,
          content: {
            aim: {
              text: "Encode up to four data dimensions in a single interactive 3D chart.",
              bullets: [
                "Build a 3D scatter plot using px.scatter_3d().",
                "Encode a fourth variable via bubble size."
              ]
            },
            theory: [
              {
                title: "Beyond Two Dimensions",
                body: [
                  "A standard scatter plot encodes two numeric dimensions via x/y position. Adding a z-axis (3D scatter) allows a third numeric dimension, and varying marker size adds a fourth.",
                  "3D plots should be used carefully — they can be harder to read precisely than 2D charts, so they work best for exploratory, interactive contexts (where the user can rotate the view) rather than static reports."
                ]
              }
            ],
            pretest: [
              {
                question: "In px.scatter_3d(), the size parameter encodes:",
                options: ["A fourth numeric variable via marker size", "The z-axis", "Chart title", "Color only"],
                answerIndex: 0,
                hint: "Size is separate from x, y, z."
              }
            ],
            posttest: [
              {
                question: "Why should 3D charts be used cautiously?",
                options: ["They load slowly", "Depth can be harder to judge precisely than 2D position", "They can't use color", "They only work with time-series data"],
                answerIndex: 1,
                hint: "Think about perceptual accuracy in 3D."
              }
            ],
            procedure: [
              "Generate a DataFrame with three numeric columns (x, y, z) plus a size and category column.",
              "Call px.scatter_3d() with x, y, z, size, and color parameters.",
              "Call fig.show() and rotate the 3D plot to explore it from different angles."
            ],
            references: ["Plotly 3D Charts — https://plotly.com/python/3d-scatter-plots/"]
          },
        },
      ],
    },
    {
      title: "Week 4: Capstone — Interactive Analytics Dashboard",
      objective: "Combine Pandas, Seaborn, and Plotly into a complete end-to-end visualization workflow.",
      tutorial: "Tutorial 4: End-to-End Visualization",
      labTitle: "Lab 4: Capstone Dashboard",
      experiments: [
        {
          id: "dv-sp-e4-1",
          title: "Multi-Panel Plotly Dashboard",
          desc: "Combine multiple chart types into a single subplot dashboard using plotly.subplots.",
          expected: "A 2x2 grid of different interactive charts in one figure.",
          code: `from plotly.subplots import make_subplots\nimport plotly.graph_objects as go\nimport pandas as pd\n\nfig = make_subplots(rows=2, cols=2, subplot_titles=("Sales","Trend","Share","Distribution"))\n\nfig.add_trace(go.Bar(x=["A","B","C"], y=[10,20,15]), row=1, col=1)\nfig.add_trace(go.Scatter(x=[1,2,3,4], y=[3,6,2,8], mode="lines+markers"), row=1, col=2)\nfig.add_trace(go.Pie(labels=["X","Y","Z"], values=[30,40,30]), row=2, col=1)\nfig.add_trace(go.Histogram(x=[1,2,2,3,3,3,4,4,5]), row=2, col=2)\n\nfig.update_layout(height=600, showlegend=False, title_text="Analytics Dashboard")\nfig.show()`,
          content: {
            aim: {
              text: "Learn to combine multiple chart types into a cohesive multi-panel interactive dashboard.",
              bullets: [
                "Use make_subplots() to define a grid layout.",
                "Add different trace types (Bar, Scatter, Pie, Histogram) to each cell."
              ]
            },
            theory: [
              {
                title: "Composing Dashboards",
                body: [
                  "Real dashboards rarely rely on a single chart type. plotly.subplots.make_subplots() lets you define a grid and populate each cell with a different trace type using go (graph_objects), Plotly's lower-level, more flexible API.",
                  "This mirrors real business intelligence dashboards where KPIs, trends, and breakdowns are shown together."
                ]
              }
            ],
            pretest: [
              {
                question: "make_subplots() belongs to which module?",
                options: ["plotly.express", "plotly.subplots", "plotly.io", "pandas"],
                answerIndex: 1,
                hint: "Read the import statement."
              }
            ],
            posttest: [
              {
                question: "row= and col= parameters in fig.add_trace() specify:",
                options: ["Chart color", "Which subplot cell the trace is placed in", "Data type", "Axis range"],
                answerIndex: 1,
                hint: "Think grid position."
              }
            ],
            procedure: [
              "Import make_subplots from plotly.subplots and go from plotly.graph_objects.",
              "Create a 2x2 grid with subplot titles.",
              "Add a Bar, Scatter, Pie, and Histogram trace to each of the four cells using row/col.",
              "Update layout height and title, then call fig.show()."
            ],
            references: ["Plotly Subplots Documentation — https://plotly.com/python/subplots/"]
          },
        },
        {
          id: "dv-sp-e4-2",
          title: "End-to-End: Pandas + Seaborn + Plotly",
          desc: "Combine data cleaning (Pandas), statistical charts (Seaborn), and an interactive summary (Plotly) into one narrative.",
          expected: "A cleaned dataset summarized by both a static statistical chart and an interactive chart.",
          code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nimport plotly.express as px\n\n# 1. Data prep with Pandas\ndf = pd.DataFrame({\n    "Region": ["North","South","East","West","North","South"],\n    "Sales": [200, 150, None, 300, 250, 180]\n})\ndf["Sales"] = df["Sales"].fillna(df["Sales"].mean())\n\n# 2. Statistical view with Seaborn\nsns.barplot(x="Region", y="Sales", data=df, estimator=sum)\nplt.title("Total Sales by Region (Seaborn)")\nplt.show()\n\n# 3. Interactive view with Plotly\nsummary = df.groupby("Region", as_index=False)["Sales"].sum()\nfig = px.pie(summary, names="Region", values="Sales", title="Sales Share by Region (Plotly)")\nfig.show()`,
          content: {
            aim: {
              text: "Practice a realistic pipeline: clean data with Pandas, then visualize it two ways for two audiences.",
              bullets: [
                "Handle missing data with fillna().",
                "Produce both a static (report-ready) and interactive (dashboard-ready) chart from the same data."
              ]
            },
            theory: [
              {
                title: "Choosing Static vs Interactive Output",
                body: [
                  "The same cleaned dataset often needs two different visual outputs: a static Seaborn/Matplotlib chart for a printed report, and an interactive Plotly chart for a live dashboard.",
                  "This experiment reinforces the full pipeline: Pandas for cleaning and aggregation, Seaborn for statistical summary, Plotly for interactive exploration — echoing the 'typical workflow' described in the course introduction."
                ]
              }
            ],
            pretest: [
              {
                question: "df['Sales'].fillna(df['Sales'].mean()) does what?",
                options: ["Removes the Sales column", "Replaces missing values with the column's mean", "Sorts the DataFrame", "Converts Sales to text"],
                answerIndex: 1,
                hint: "fillna replaces NaNs."
              }
            ],
            posttest: [
              {
                question: "Why produce both a Seaborn and a Plotly chart from the same data?",
                options: ["It's required by Python", "Different audiences/contexts need static vs interactive output", "Plotly can't read Pandas DataFrames", "Seaborn charts can't have titles"],
                answerIndex: 1,
                hint: "Think about report vs. dashboard use cases."
              }
            ],
            procedure: [
              "Build a DataFrame with a missing value and fill it using the column mean.",
              "Create a Seaborn bar chart summing Sales by Region.",
              "Group the data with df.groupby() and create a Plotly pie chart of the same summary.",
              "Compare the two outputs and note their different use cases."
            ],
            references: ["Pandas groupby Documentation — https://pandas.pydata.org/docs/reference/groupby.html"]
          },
        },
        {
          id: "dv-sp-e4-3",
          title: "Capstone: Sales Analytics Notebook",
          desc: "Build a complete visualization notebook combining at least four chart types to tell a full data story.",
          expected: "A multi-section notebook output covering trend, comparison, distribution, and composition.",
          code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(7)\ndates = pd.date_range("2024-01-01", periods=90)\ndf = pd.DataFrame({\n    "date": dates,\n    "region": np.random.choice(["North","South","East","West"], 90),\n    "sales": np.random.randint(100, 500, 90)\n})\n\n# Trend\ndaily = df.groupby("date")["sales"].sum()\nplt.figure(figsize=(8,3))\ndaily.plot()\nplt.title("Daily Sales Trend")\nplt.show()\n\n# Comparison\nsns.barplot(x="region", y="sales", data=df, estimator=sum)\nplt.title("Total Sales by Region")\nplt.show()\n\n# Distribution\nsns.histplot(df["sales"], kde=True)\nplt.title("Sales Distribution")\nplt.show()\n\n# Composition\nregion_totals = df.groupby("region")["sales"].sum()\nplt.figure(figsize=(5,5))\nplt.pie(region_totals, labels=region_totals.index, autopct="%1.1f%%")\nplt.title("Sales Share by Region")\nplt.show()`,
          content: {
            aim: {
              text: "Synthesize everything learned in this course into one cohesive analytics notebook covering trend, comparison, distribution, and composition.",
              bullets: [
                "Generate a time-series trend chart.",
                "Generate a categorical comparison chart.",
                "Generate a distribution chart.",
                "Generate a composition (share-of-whole) chart."
              ]
            },
            theory: [
              {
                title: "The Four Analytical Questions",
                body: [
                  "Nearly every business analytics story answers four questions: How is it trending over time? How do categories compare? What does the distribution look like? How is the total composed?",
                  "This capstone maps each question to the appropriate chart type: line chart (trend), bar chart (comparison), histogram (distribution), pie chart (composition) — directly applying the chart-selection principles from Course 1."
                ]
              }
            ],
            pretest: [
              {
                question: "Which chart best answers 'how is this trending over time'?",
                options: ["Pie chart", "Line chart", "Box plot", "Heatmap"],
                answerIndex: 1,
                hint: "Time-series data pairs with a specific chart from Table 2."
              }
            ],
            posttest: [
              {
                question: "This capstone notebook demonstrates chart selection based primarily on:",
                options: ["Random choice", "The analytical question being asked", "File size constraints", "Available colors"],
                answerIndex: 1,
                hint: "Recall the 'Appropriate Chart Selection' design principle."
              }
            ],
            procedure: [
              "Generate a synthetic 90-day sales dataset with date, region, and sales columns.",
              "Aggregate by date and plot a trend line chart.",
              "Aggregate by region and plot a bar chart comparison.",
              "Plot a histogram of the raw sales distribution.",
              "Aggregate totals by region and plot a pie chart of composition.",
              "Write a short summary connecting each chart back to a specific business question."
            ],
            references: [
              "Few, S. (2009). Now You See It: Simple Visualization Techniques for Quantitative Analysis.",
              "Course Sections 1–5 (Data Visualization Foundations, this VLMS)"
            ]
          },
        },
      ],
    },
  ],
};