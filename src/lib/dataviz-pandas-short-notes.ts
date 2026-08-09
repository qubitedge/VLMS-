// src/lib/dataviz-pandas-short-notes.ts

export const datavizPandasShortNotes = `DATA VISUALIZATION WITH PANDAS - SHORT NOTES

SECTION 1: INTRODUCTION TO PANDAS PLOTTING

What is Pandas Plotting?
Imagine you have a big table of numbers in your notebook (a Pandas DataFrame). Instead of staring at thousands of numbers trying to guess which month had the highest ice cream sales, Pandas lets you call one simple magic command: .plot()! 

Pandas wraps around Matplotlib under the hood. This means Pandas does the heavy lifting of pulling columns, creating labels, placing axes, and choosing default colors so you can turn raw tables into beautiful charts with just a single line of code!

Why use Pandas .plot() directly instead of raw Matplotlib?
- Direct DataFrame Integration: No need to extract raw NumPy arrays or loop through columns.
- Automatic Axis Labeling: Pandas uses column names as legend labels and index values as X-axis ticks automatically.
- High-level Syntax: Switch chart types by simply changing the 'kind' parameter (e.g., kind='bar', kind='hist', kind='scatter').

Visualization Pipeline in Pandas:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Step</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Pandas Function / Method</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Purpose</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">1. Prepare Data</td><td class="p-3 border border-cyan/20">pd.read_csv(), df.clean(), df.groupby()</td><td class="p-3 border border-cyan/20">Load, clean, and aggregate data into a tidy DataFrame</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">2. Basic Plotting</td><td class="p-3 border border-cyan/20">df.plot(kind='line', x=..., y=...)</td><td class="p-3 border border-cyan/20">Generate quick primary visualization directly from DataFrame</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">3. Multi-Variable / Faceting</td><td class="p-3 border border-cyan/20">df.plot(subplots=True, layout=(r, c))</td><td class="p-3 border border-cyan/20">Split multiple metrics into separate sub-axes grid</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">4. Styling & Customization</td><td class="p-3 border border-cyan/20">colormap='viridis', grid=True, title=...</td><td class="p-3 border border-cyan/20">Enhance readability, contrast, color maps, and labels</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">5. Display / Save</td><td class="p-3 border border-cyan/20">plt.show(), plt.savefig('chart.png')</td><td class="p-3 border border-cyan/20">Render or export figure to publication-quality format</td></tr></tbody></table>

![Pandas Line and Bar Plots](/pandas_line_bar.png)

SECTION 2: CORE PLOT KINDS & WHEN TO USE THEM

Pandas supports 11 fundamental plot types through the \`kind\` parameter in \`df.plot(kind=...)\` or via direct methods \`df.plot.<kind>()\`.

Core Chart Types Matrix:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Plot Kind</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Pandas Method</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Primary Use Case</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Key Arguments</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'line'</td><td class="p-3 border border-cyan/20">df.plot.line()</td><td class="p-3 border border-cyan/20">Trends over continuous time or index</td><td class="p-3 border border-cyan/20">x, y, style, color, lw</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'bar'</td><td class="p-3 border border-cyan/20">df.plot.bar()</td><td class="p-3 border border-cyan/20">Comparing discrete category values vertically</td><td class="p-3 border border-cyan/20">x, y, stacked=True/False, rot</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'barh'</td><td class="p-3 border border-cyan/20">df.plot.barh()</td><td class="p-3 border border-cyan/20">Horizontal bars for categories with long names</td><td class="p-3 border border-cyan/20">x, y, stacked, figsize</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'hist'</td><td class="p-3 border border-cyan/20">df.plot.hist()</td><td class="p-3 border border-cyan/20">Frequency distribution of continuous numeric data</td><td class="p-3 border border-cyan/20">bins, alpha, density, cumulative</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'box'</td><td class="p-3 border border-cyan/20">df.plot.box() / df.boxplot()</td><td class="p-3 border border-cyan/20">Five-number summary & outlier detection</td><td class="p-3 border border-cyan/20">by (grouping column), vert</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'kde' / 'density'</td><td class="p-3 border border-cyan/20">df.plot.kde()</td><td class="p-3 border border-cyan/20">Smoothed continuous probability density estimation</td><td class="p-3 border border-cyan/20">bw_method, ind</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'area'</td><td class="p-3 border border-cyan/20">df.plot.area()</td><td class="p-3 border border-cyan/20">Cumulative totals & proportional changes over time</td><td class="p-3 border border-cyan/20">stacked=True/False, alpha</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'scatter'</td><td class="p-3 border border-cyan/20">df.plot.scatter()</td><td class="p-3 border border-cyan/20">Relationship between 2 continuous variables</td><td class="p-3 border border-cyan/20">x, y, c (color col), s (size col)</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'hexbin'</td><td class="p-3 border border-cyan/20">df.plot.hexbin()</td><td class="p-3 border border-cyan/20">2D density binning for large overlapping points</td><td class="p-3 border border-cyan/20">gridsize, cmap, C (weight)</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">'pie'</td><td class="p-3 border border-cyan/20">df.plot.pie()</td><td class="p-3 border border-cyan/20">Proportions of a whole (categorical composition)</td><td class="p-3 border border-cyan/20">autopct, explode, labels, colors</td></tr></tbody></table>

![Pandas Distribution Plots (Histogram & KDE)](/pandas_histogram_kde.png)

SECTION 3: CODE PATTERNS & PRACTICAL EXAMPLES

1. Basic Line & Bar Chart Snippet:
[START_CODE_SNIPPET]
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create monthly sales data
df = pd.DataFrame({
    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'Electronics': [15000, 18000, 22000, 19000, 25000, 28000],
    'Clothing': [12000, 14000, 13000, 16000, 18000, 21000]
}).set_index('Month')

# Line plot of trends
df.plot(kind='line', marker='o', linewidth=2, figsize=(8, 4), title="Monthly Sales Trends")
plt.ylabel("Revenue ($)")
plt.grid(True, linestyle='--', alpha=0.6)
plt.show()

# Stacked bar plot
df.plot(kind='bar', stacked=True, colormap='viridis', figsize=(8, 4), title="Stacked Revenue by Category")
plt.ylabel("Total Sales ($)")
plt.show()
[END_CODE_SNIPPET]

![Pandas Scatter and Hexbin Plots](/pandas_scatter_hexbin.png)

2. Bivariate Scatter & Hexbin Snippet:
[START_CODE_SNIPPET]
# Scatter plot with third variable mapped to color (c) and fourth to size (s)
np.random.seed(42)
df_scatter = pd.DataFrame({
    'Height_cm': np.random.normal(170, 10, 200),
    'Weight_kg': np.random.normal(70, 12, 200),
    'Age': np.random.randint(18, 65, 200),
    'Income_k': np.random.uniform(20, 120, 200)
})

# Scatter chart with colormap & dot size mapping
df_scatter.plot.scatter(
    x='Height_cm', 
    y='Weight_kg', 
    c='Age', 
    s=df_scatter['Income_k'] * 1.5,
    cmap='coolwarm', 
    figsize=(8, 5),
    title="Height vs Weight (Color=Age, Size=Income)"
)
plt.show()

# Hexbin plot for dense datasets
df_scatter.plot.hexbin(x='Height_cm', y='Weight_kg', gridsize=15, cmap='Purples', figsize=(8, 5), title="2D Hexbin Density")
plt.show()
[END_CODE_SNIPPET]

![Pandas Boxplot and Area Plot](/pandas_boxplot_area.png)

3. Boxplot Anatomy & Grouped Analysis:
[START_CODE_SNIPPET]
df_tips = pd.DataFrame({
    'Day': np.random.choice(['Thur', 'Fri', 'Sat', 'Sun'], 300),
    'TotalBill': np.random.exponential(scale=20, size=300) + 5
})

# Grouped boxplot using pandas .boxplot()
df_tips.boxplot(column='TotalBill', by='Day', grid=False, vert=True, patch_artist=True)
plt.suptitle("") # Suppress default pandas title
plt.title("Total Bill Distribution by Day of Week")
plt.ylabel("Bill Amount ($)")
plt.show()
[END_CODE_SNIPPET]

![Pandas Multi-Plot Subplots and Custom Styling](/pandas_subplots_styling.png)

4. Subplots Grid & Custom Styling:
[START_CODE_SNIPPET]
df_multi = pd.DataFrame(
    np.random.randn(100, 4).cumsum(axis=0),
    columns=['Asset_A', 'Asset_B', 'Asset_C', 'Asset_D']
)

# 2x2 grid of subplots with shared X axis
axes = df_multi.plot(subplots=True, layout=(2, 2), figsize=(10, 6), sharex=True, colormap='Dark2', title="Multi-Asset Performance Grid")
plt.tight_layout()
plt.show()
[END_CODE_SNIPPET]

SECTION 4: ESSENTIAL PANDAS PLOTTING TIPS & TRICKS

1. Handling Missing Data:
Pandas automatically skips NaN values in most plot types, but for line charts, missing points create line breaks. Use \`df.interpolate().plot()\` or \`df.ffill().plot()\` to avoid broken lines.

2. Controlling Legend & Axis Formatting:
- Suppress legend: \`legend=False\`
- Rotate X-axis tick labels: \`rot=45\`
- Secondary Y-axis: \`secondary_y=['Column_B']\` to plot two metrics with vastly different scales on the same figure!

3. Saving High-Resolution Figures:
Always call \`plt.savefig('output_plot.png', dpi=300, bbox_inches='tight')\` before \`plt.show()\`, as \`plt.show()\` clears the active figure buffer!
`;
