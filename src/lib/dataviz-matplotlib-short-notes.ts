// src/lib/dataviz-matplotlib-short-notes.ts

export const datavizMatplotlibShortNotes = `DATA VISUALIZATION WITH MATPLOTLIB - SHORT NOTES

SECTION 1: INTRODUCTION TO MATPLOTLIB & ARCHITECTURE

What is Matplotlib?
Matplotlib is the foundational, low-level data visualization library in Python. Built originally by John D. Hunter in 2003, it forms the backbone of the entire Python data visualization ecosystem. High-level visualization libraries like Seaborn and Pandas plotting API are built directly on top of Matplotlib.

Matplotlib Architecture Hierarchy:
Matplotlib operates on a clear hierarchical component structure:

1. Figure: The top-level overall canvas or window containing one or more plots, legends, titles, and colorbars.
2. Axes: The actual plot or chart area containing data points, lines, bars, ticks, titles, and axis labels. A single Figure can contain multiple Axes (e.g. subplots).
3. Axis: The horizontal (X) and vertical (Y) number lines on an Axes that establish limits, scale (linear, log), tick marks, and tick labels.
4. Artist: Everything visible on the figure (lines, text, patches, markers, collections, legends) is an Artist object.

Matplotlib Component Architecture:
[TABLE]:<table class="w-full border-collapse border border-sky-300/40 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-sky-500/10 to-teal-500/10 text-sky-700 dark:text-sky-400 font-bold"><tr><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Component</th><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Pyplot / OO Access</th><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Description</th></tr></thead><tbody class="divide-y divide-sky-100 dark:divide-sky-900"><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Figure</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.figure() / fig</td><td class="p-3 border border-sky-200 dark:border-sky-800">Top-level container holding all subplots and canvas elements.</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Axes</td><td class="p-3 border border-sky-200 dark:border-sky-800">fig.add_subplot() / ax</td><td class="p-3 border border-sky-200 dark:border-sky-800">The plot area bounded by spines where data is rendered.</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Axis</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.xaxis, ax.yaxis</td><td class="p-3 border border-sky-200 dark:border-sky-800">Manages ticks, tick labels, axis scale, and data limits.</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Spines</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.spines['top'|'bottom'...]</td><td class="p-3 border border-sky-200 dark:border-sky-800">The four border lines bounding the plot area.</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Artist</td><td class="p-3 border border-sky-200 dark:border-sky-800">Line2D, PathCollection, Text</td><td class="p-3 border border-sky-200 dark:border-sky-800">Base class for every visual object rendered on canvas.</td></tr></tbody></table>

![Matplotlib Figure Anatomy](/matplotlib_anatomy.png)

--------------------------------------------------------------------------------

SECTION 2: PYPLOT API VS OBJECT-ORIENTED (OO) INTERFACE

Matplotlib provides two distinct programming paradigms:

1. Pyplot State-Machine Interface (Implicit API):
Uses module-level functions in \`matplotlib.pyplot\` (e.g. \`plt.plot()\`, \`plt.title()\`, \`plt.xlabel()\`).
- Pros: Simple, fast for quick one-off exploratory scripts.
- Cons: Uses implicit active state; difficult to manage multiple figures or complex multi-panel layouts.

2. Object-Oriented Interface (Explicit API):
Explicitly creates Figure and Axes objects via \`fig, ax = plt.subplots()\`.
- Pros: Complete control over every visual element; cleanly manages multi-panel layouts; reproducible code.
- Cons: Slightly more initial boilerplate.

API Comparison Matrix:
[TABLE]:<table class="w-full border-collapse border border-sky-300/40 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-sky-500/10 to-teal-500/10 text-sky-700 dark:text-sky-400 font-bold"><tr><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Action</th><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Pyplot (Implicit API)</th><th class="p-3 border border-sky-200 dark:border-sky-800 tracking-wide text-left">Object-Oriented (Explicit API)</th></tr></thead><tbody class="divide-y divide-sky-100 dark:divide-sky-900"><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Create Canvas</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.figure(figsize=(8, 4))</td><td class="p-3 border border-sky-200 dark:border-sky-800">fig, ax = plt.subplots(figsize=(8, 4))</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Plot Line</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.plot(x, y)</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.plot(x, y)</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Set Title</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.title("Title")</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.set_title("Title")</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Set X-Label</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.xlabel("X Axis")</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.set_xlabel("X Axis")</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Set Axis Limits</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.xlim(0, 100)</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.set_xlim(0, 100)</td></tr><tr class="hover:bg-sky-50/50 transition-colors"><td class="p-3 border border-sky-200 dark:border-sky-800 font-bold text-sky-600">Toggle Grid</td><td class="p-3 border border-sky-200 dark:border-sky-800">plt.grid(True)</td><td class="p-3 border border-sky-200 dark:border-sky-800">ax.grid(True)</td></tr></tbody></table>

--------------------------------------------------------------------------------

SECTION 3: CORE CHART TYPES & FUNCTIONS

Matplotlib provides specialized plot functions for every domain:

1. Line Plot (\`ax.plot\`): Visualizes continuous temporal or numerical trends.
   Key params: \`color\`, \`linestyle\` ('-', '--', '-.', ':'), \`linewidth\` (\`lw\`), \`marker\` ('o', 's', '^'), \`markersize\` (\`ms\`).

2. Bar Chart (\`ax.bar\` / \`ax.barh\`): Compares categorical values.
   Key params: \`x\`, \`height\`, \`width\`, \`color\`, \`edgecolor\`, \`bottom\` (for vertical stacking), \`left\` (for horizontal stacking).

3. Histogram (\`ax.hist\`): Plots frequency distribution of continuous numerical data.
   Key params: \`bins\` (integer or array), \`range\`, \`density=True\` (normalizes area to 1), \`cumulative=True\`, \`alpha\`.

4. Scatter Plot (\`ax.scatter\`): Analyzes relationship between two continuous variables.
   Key params: \`x\`, \`y\`, \`s\` (size array/scalar), \`c\` (color array/scalar), \`cmap\` ('viridis', 'plasma', 'coolwarm'), \`alpha\`.

5. Pie & Donut Chart (\`ax.pie\`): Displays categorical proportions of a whole.
   Key params: \`x\`, \`labels\`, \`autopct='%1.1f%%'\`, \`explode\` (array of offsets), \`startangle\`, \`wedgeprops=dict(width=0.4)\` (for donut).

6. Box & Violin Plot (\`ax.boxplot\` / \`ax.violinplot\`): Summarizes statistical distribution (median, IQR, outliers).
   Key params: \`x\`, \`vert=True/False\`, \`patch_artist=True\`, \`notch=True\`, \`showmeans=True\`.

7. Heatmap / Matrix Plot (\`ax.imshow\`): Displays 2D numeric matrices as colored grids.
   Key params: \`X\`, \`cmap\`, \`origin='upper'/'lower'\`, \`vmin\`, \`vmax\`, \`aspect='auto'\`.

![Matplotlib Core Plot Types](/matplotlib_bar_charts.png)

--------------------------------------------------------------------------------

SECTION 4: MULTI-PANEL LAYOUTS & DUAL AXES

1. Creating Subplot Grids:
Use \`fig, axes = plt.subplots(nrows, ncols, figsize=(w, h))\`.
When \`nrows > 1\` and \`ncols > 1\`, \`axes\` is a 2D NumPy array (\`axes[row, col]\`).

2. Uneven Grids with GridSpec:
Use \`matplotlib.gridspec.GridSpec\` to create subplots that span multiple rows or columns.
\`\`\`python
import matplotlib.gridspec as gridspec
fig = plt.figure(figsize=(10, 6))
gs = gridspec.GridSpec(2, 2, figure=fig)
ax_main = fig.add_subplot(gs[0, :]) # Spans top row
ax_left = fig.add_subplot(gs[1, 0]) # Bottom left
ax_right = fig.add_subplot(gs[1, 1]) # Bottom right
\`\`\`

3. Dual-Scale Twin Axes (\`twinx\` / \`twiny\`):
Allows plotting two metrics with different scales (e.g. Temperature °C vs Rainfall mm) sharing the same X-axis.
\`\`\`python
fig, ax1 = plt.subplots()
ax2 = ax1.twinx() # Create twin y-axis sharing x-axis
ax1.plot(x, y1, color='blue', label='Metric 1')
ax2.plot(x, y2, color='orange', label='Metric 2')
\`\`\`

![Matplotlib Multi-Panel Layouts and Twin Axes](/matplotlib_gridspec_twinx.png)

--------------------------------------------------------------------------------

SECTION 5: CUSTOMIZATION, STYLING, AND EXPORT

1. Styling & Themes:
- Select built-in style sheet: \`plt.style.use('seaborn-v0_8-whitegrid')\` or \`plt.style.use('default')\`.
- Customize runtime parameters: \`plt.rcParams['font.family'] = 'sans-serif'\`, \`plt.rcParams['font.size'] = 12\`.

2. Annotations & Spines:
- Add text callout with arrow:
  \`ax.annotate("Peak Value", xy=(x_peak, y_peak), xytext=(x_text, y_text), arrowprops=dict(arrowstyle="->", color="black"))\`
- Remove top & right spines for clean modern look:
  \`ax.spines['top'].set_visible(False)\`
  \`ax.spines['right'].set_visible(False)\`

![Matplotlib Style Engine and High Resolution Figure Export](/matplotlib_style_export.png)

3. Saving Figures to File:
Export high-resolution images for publications or web applications:
\`plt.savefig('output_chart.png', dpi=300, bbox_inches='tight', transparent=False)\`
- \`dpi=300\`: High quality 300 Dots-Per-Inch resolution.
- \`bbox_inches='tight'\`: Automatically crops extra whitespace around labels.
- Supported formats: PNG, SVG, PDF, JPG, EPS.
`;
