// lib/dataviz-seaborn-plotly-short-notes.ts

export const datavizSeabornPlotlyShortNotes = `DATA VISUALIZATION WITH SEABORN & PLOTLY - SHORT NOTES
(Standard Curriculum)

INTRODUCTION TO DATA VISUALIZATION WITH PYTHON

Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data. In the Python ecosystem, two libraries stand out for their power and flexibility: Seaborn and Plotly.

Seaborn vs Plotly: A Comparison
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide">Feature</th><th class="p-3 border border-cyan/20 tracking-wide">Seaborn</th><th class="p-3 border border-cyan/20 tracking-wide">Plotly</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Output Type</td><td class="p-3 border border-cyan/20">Static images (PNG, PDF, SVG)</td><td class="p-3 border border-cyan/20">Interactive HTML/JavaScript charts</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Interactivity</td><td class="p-3 border border-cyan/20">Limited (requires Matplotlib widgets)</td><td class="p-3 border border-cyan/20">Full (hover, zoom, pan, click events)</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Statistical Focus</td><td class="p-3 border border-cyan/20">Designed specifically for statistical graphics</td><td class="p-3 border border-cyan/20">General purpose with statistical capabilities</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Built on</td><td class="p-3 border border-cyan/20">Matplotlib</td><td class="p-3 border border-cyan/20">D3.js, WebGL, and HTML5 Canvas</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Ease of Use</td><td class="p-3 border border-cyan/20">High-level API, similar to Pandas</td><td class="p-3 border border-cyan/20">Express API for simplicity, Graph Objects for control</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">3D Capabilities</td><td class="p-3 border border-cyan/20">Limited (via Matplotlib 3D toolkit)</td><td class="p-3 border border-cyan/20">Full 3D rendering with rotation and zoom</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Geographic Maps</td><td class="p-3 border border-cyan/20">Basic (via external libraries)</td><td class="p-3 border border-cyan/20">Advanced choropleth and scatter maps</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Dashboard Creation</td><td class="p-3 border border-cyan/20">Not supported natively</td><td class="p-3 border border-cyan/20">Full support via Plotly Dash</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Best Use Cases</td><td class="p-3 border border-cyan/20">EDA, statistical reports, publications</td><td class="p-3 border border-cyan/20">Dashboards, web apps, interactive reports</td></tr></tbody></table>

Visualization Pipeline:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Step</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Description</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Tools/Methods</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">1. Data Preparation</td><td class="p-3 border border-cyan/20">Clean, transform, and organize data</td><td class="p-3 border border-cyan/20">Pandas, NumPy</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">2. Statistical Analysis</td><td class="p-3 border border-cyan/20">Understand distributions and relationships</td><td class="p-3 border border-cyan/20">Seaborn, SciPy</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">3. Chart Selection</td><td class="p-3 border border-cyan/20">Choose appropriate visualization type</td><td class="p-3 border border-cyan/20">Design principles, audience analysis</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">4. Static Visualization</td><td class="p-3 border border-cyan/20">Create publication-ready figures</td><td class="p-3 border border-cyan/20">Seaborn, Matplotlib</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">5. Interactive Visualization</td><td class="p-3 border border-cyan/20">Create explorable web-based charts</td><td class="p-3 border border-cyan/20">Plotly Express, Graph Objects</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">6. Dashboard Deployment</td><td class="p-3 border border-cyan/20">Deploy multi-chart dashboards</td><td class="p-3 border border-cyan/20">Plotly Dash</td></tr></tbody></table>

SEABORN — STATISTICAL DATA VISUALIZATION

Seaborn is a Python data visualization library based on Matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.

Key Seaborn Features:
- Integration with Pandas DataFrames
- Built-in themes for professional styling
- Statistical estimation and aggregation
- Support for complex multi-plot grids
- Publication-quality output

Seaborn Theme System:
[START_CODE_SNIPPET]
import seaborn as sns
import matplotlib.pyplot as plt

# Set global theme
sns.set_theme(style="whitegrid", palette="muted")

# Available themes: "darkgrid", "whitegrid", "dark", "white", "ticks"
# Available palettes: "deep", "muted", "pastel", "bright", "dark", "colorblind"
[END_CODE_SNIPPET]

DISTRIBUTION PLOTS

Histograms and Density Plots:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Function</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Purpose</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Key Parameters</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">histplot()</td><td class="p-3 border border-cyan-20">Distribution of a single variable using bins</td><td class="p-3 border border-cyan/20">bins, binwidth, kde, stat</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">kdeplot()</td><td class="p-3 border border-cyan/20">Smoothed density estimation</td><td class="p-3 border border-cyan/20">bw_method, clip, cumulative</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">ecdfplot()</td><td class="p-3 border border-cyan/20">Empirical cumulative distribution function</td><td class="p-3 border border-cyan/20">stat, complementary</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">rugplot()</td><td class="p-3 border border-cyan/20">Tick marks for each observation</td><td class="p-3 border border-cyan/20">height, expand_margins</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">displot()</td><td class="p-3 border border-cyan/20">Figure-level distribution plot</td><td class="p-3 border border-cyan/20">kind (hist, kde, ecdf), rug, col, row</td></tr></tbody></table>

Example: Distribution Analysis
[START_CODE_SNIPPET]
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Generate sample data
data = np.random.normal(loc=50, scale=10, size=500)

# Basic histogram with density curve
sns.histplot(data, kde=True, color="teal", bins=20)
plt.title("Distribution of Sample Data")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()

# Multiple distributions comparison
sns.displot(data, kind="kde", fill=True, height=4, aspect=2)
plt.show()
[END_CODE_SNIPPET]

CATEGORICAL PLOTS

Seaborn offers several plot types for visualizing categorical data:

Categorical Plot Types:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Plot Type</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Description</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Best Used For</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">boxplot()</td><td class="p-3 border border-cyan/20">Box and whisker plot showing quartiles and outliers</td><td class="p-3 border border-cyan/20">Comparing distributions across categories</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">violinplot()</td><td class="p-3 border border-cyan/20">Combination of box plot and KDE, showing full distribution</td><td class="p-3 border border-cyan/20">Multimodal distributions, density shape</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">barplot()</td><td class="p-3 border border-cyan/20">Bar chart showing aggregate statistics (mean, sum)</td><td class="p-3 border border-cyan/20">Comparing summary values across categories</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">countplot()</td><td class="p-3 border border-cyan/20">Number of observations in each category</td><td class="p-3 border border-cyan/20">Frequency distribution of categorical data</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">pointplot()</td><td class="p-3 border border-cyan/20">Point estimates with confidence intervals</td><td class="p-3 border border-cyan/20">Trend visualization across categories</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">catplot()</td><td class="p-3 border border-cyan/20">Figure-level categorical plot</td><td class="p-3 border border-cyan/20">Faceted categorical comparisons</td></tr></tbody></table>

Example: Categorical Analysis
[START_CODE_SNIPPET]
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Load example dataset
df = sns.load_dataset("tips")

# Compare box plot vs violin plot side by side
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.boxplot(x="day", y="total_bill", data=df, ax=axes[0])
axes[0].set_title("Box Plot")
sns.violinplot(x="day", y="total_bill", data=df, ax=axes[1])
axes[1].set_title("Violin Plot")
plt.tight_layout()
plt.show()

# Bar plot with error bars
sns.barplot(x="day", y="total_bill", data=df, errorbar=('ci', 95))
plt.title("Average Total Bill by Day")
plt.show()
[END_CODE_SNIPPET]

RELATIONAL PLOTS

Visualizing relationships between variables:

Relational Plot Functions:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Function</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Purpose</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Key Parameters</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">scatterplot()</td><td class="p-3 border border-cyan/20">Points showing relationship between two numeric variables</td><td class="p-3 border border-cyan/20">hue, style, size, alpha</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">lineplot()</td><td class="p-3 border border-cyan/20">Trend lines, often with error bands</td><td class="p-3 border border-cyan/20">estimator, errorbar, sort</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">regplot()</td><td class="p-3 border border-cyan/20">Scatter plot with regression line</td><td class="p-3 border border-cyan/20">order, logistic, ci</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">lmplot()</td><td class="p-3 border border-cyan/20">Figure-level regression plot with faceting</td><td class="p-3 border border-cyan/20">hue, col, row, markers</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">relplot()</td><td class="p-3 border border-cyan/20">Figure-level relational plot</td><td class="p-3 border border-cyan/20">kind (scatter, line), hue, col, row</td></tr></tbody></table>

Example: Multi-Dimensional Relationships
[START_CODE_SNIPPET]
import seaborn as sns
import matplotlib.pyplot as plt

# Load data
df = sns.load_dataset("iris")

# Scatter plot with hue and style
sns.scatterplot(x="sepal_length", y="sepal_width", 
                hue="species", style="species", 
                data=df, s=80)
plt.title("Iris Sepal Measurements by Species")
plt.show()

# Regression plot
sns.lmplot(x="sepal_length", y="petal_length", 
           hue="species", data=df, height=5, aspect=1.5)
plt.show()
[END_CODE_SNIPPET]

MATRIX PLOTS

Heatmaps and Pairplots:

Heatmap Example:
[START_CODE_SNIPPET]
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create correlation matrix
np.random.seed(0)
df = pd.DataFrame(np.random.randn(100, 5), columns=['A','B','C','D','E'])
correlation = df.corr()

# Plot heatmap
sns.heatmap(correlation, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title("Correlation Heatmap")
plt.show()
[END_CODE_SNIPPET]

Pairplot Example:
[START_CODE_SNIPPET]
import seaborn as sns
import matplotlib.pyplot as plt

# Load data
df = sns.load_dataset("iris")

# Pairplot with hue
sns.pairplot(df, hue="species", diag_kind="kde")
plt.show()

# Customized pairplot
sns.pairplot(df, hue="species", 
             diag_kind="hist", 
             plot_kws={'alpha': 0.6},
             diag_kws={'bins': 20})
plt.show()
[END_CODE_SNIPPET]

ADVANCED SEABORN — FACETGRID AND SMALL MULTIPLES

FacetGrid is a multi-plot grid system for visualizing subsets of data:

FacetGrid Implementation:
[START_CODE_SNIPPET]
import seaborn as sns
import matplotlib.pyplot as plt

# Load data
df = sns.load_dataset("tips")

# Basic FacetGrid
g = sns.FacetGrid(df, col="time", row="smoker", height=4)
g.map(sns.histplot, "total_bill")
plt.show()

# Custom FacetGrid with multiple plots
g = sns.FacetGrid(df, col="time", row="smoker", 
                  height=3.5, aspect=1.2)
g.map(sns.scatterplot, "total_bill", "tip")
g.add_legend()
plt.show()

# Advanced FacetGrid
g = sns.FacetGrid(df, col="day", hue="sex", height=4)
g.map(sns.violinplot, "time", "total_bill")
g.add_legend()
plt.show()
[END_CODE_SNIPPET]

PLOTLY — INTERACTIVE VISUALIZATION

Plotly is a graphing library that makes interactive, publication-quality graphs online. Plotly Express is a high-level API for creating interactive charts with minimal code.

Plotly Express — High-Level API:
Plotly Express provides concise syntax similar to Seaborn but with built-in interactivity.

Core Plotly Express Functions:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Function</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Chart Type</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Best Used For</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.line()</td><td class="p-3 border border-cyan/20">Line chart</td><td class="p-3 border border-cyan/20">Time series trends</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.bar()</td><td class="p-3 border border-cyan/20">Bar chart</td><td class="p-3 border border-cyan/20">Categorical comparisons</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.scatter()</td><td class="p-3 border border-cyan/20">Scatter plot</td><td class="p-3 border border-cyan/20">Relationships between variables</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.histogram()</td><td class="p-3 border border-cyan/20">Histogram</td><td class="p-3 border border-cyan/20">Distribution of single variable</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.box()</td><td class="p-3 border border-cyan/20">Box plot</td><td class="p-3 border border-cyan/20">Distribution comparison across categories</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.violin()</td><td class="p-3 border border-cyan/20">Violin plot</td><td class="p-3 border border-cyan/20">Density comparison across categories</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">px.pie()</td><td class="p-3 border border-cyan/20">Pie chart</td><td class="p-3 border border-cyan/20">Part-to-whole relationships</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/20">px.scatter_3d()</td><td class="p-3 border border-cyan/20">3D scatter plot</td><td class="p-3 border border-cyan/20">Three-dimensional relationships</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/20">px.choropleth()</td><td class="p-3 border border-cyan/20">Geographic map</td><td class="p-3 border border-cyan/20">Spatial data visualization</td></tr></tbody></table>

Example: Interactive Chart Creation
[START_CODE_SNIPPET]
import plotly.express as px
import pandas as pd

# Basic line chart with interactivity
df = pd.DataFrame({
    "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "Sales": [1200, 1500, 1100, 1800, 2000, 1700]
})

fig = px.line(df, x="Month", y="Sales", 
              title="Monthly Sales Trends",
              markers=True)
fig.show()

# Scatter plot with color and size encoding
df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length",
                 color="species", size="petal_length",
                 title="Iris Dataset Scatter Plot")
fig.show()
[END_CODE_SNIPPET]

GEOSPATIAL VISUALIZATION WITH PLOTLY

Choropleth Maps:
[START_CODE_SNIPPET]
import plotly.express as px
import pandas as pd

# Sample country data
df = pd.DataFrame({
    "country": ["India", "United States", "Germany", "Brazil", "Australia"],
    "value": [80, 95, 70, 60, 85]
})

# Create choropleth map
fig = px.choropleth(
    df, 
    locations="country",
    locationmode="country names",
    color="value",
    title="Sample Choropleth Map",
    color_continuous_scale=px.colors.sequential.Blues
)
fig.show()

# Advanced choropleth with animation
df = px.data.gapminder()
fig = px.choropleth(
    df, 
    locations="iso_alpha",
    color="lifeExp",
    hover_name="country",
    animation_frame="year",
    title="Life Expectancy Over Time",
    color_continuous_scale=px.colors.sequential.Plasma
)
fig.show()
[END_CODE_SNIPPET]

3D VISUALIZATION

3D Scatter Plots:
[START_CODE_SNIPPET]
import plotly.express as px
import pandas as pd
import numpy as np

# Create 3D data
np.random.seed(42)
df = pd.DataFrame({
    "x": np.random.randn(100) * 10 + 50,
    "y": np.random.randn(100) * 10 + 50,
    "z": np.random.randn(100) * 10 + 50,
    "size": np.random.rand(100) * 30 + 10,
    "category": np.random.choice(["A", "B", "C"], 100)
})

# 3D scatter with size encoding
fig = px.scatter_3d(
    df, 
    x="x", y="y", z="z",
    color="category", 
    size="size",
    title="Interactive 3D Scatter Plot"
)
fig.show()
[END_CODE_SNIPPET]

PLOTLY GRAPH OBJECTS — LOWER-LEVEL API

Plotly Graph Objects provides more control over chart customization:

Graph Objects Examples:
[START_CODE_SNIPPET]
import plotly.graph_objects as go
import pandas as pd

# Create figure with multiple traces
fig = go.Figure()

# Add scatter trace
fig.add_trace(go.Scatter(
    x=[1, 2, 3, 4],
    y=[10, 11, 12, 13],
    mode='lines+markers',
    name='Line + Markers'
))

# Add bar trace
fig.add_trace(go.Bar(
    x=['A', 'B', 'C', 'D'],
    y=[20, 14, 23, 25],
    name='Bar Chart'
))

# Update layout
fig.update_layout(
    title='Multiple Trace Types',
    xaxis_title='Category',
    yaxis_title='Value'
)
fig.show()
[END_CODE_SNIPPET]

PLOTLY SUBPLOTS

Creating multi-panel interactive charts:

Subplots Example:
[START_CODE_SNIPPET]
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import pandas as pd

# Create 2x2 subplot grid
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=("Scatter", "Bar", "Pie", "Histogram")
)

# Add traces
fig.add_trace(
    go.Scatter(x=[1,2,3,4], y=[10,11,12,13], mode='lines+markers'),
    row=1, col=1
)

fig.add_trace(
    go.Bar(x=['A','B','C'], y=[20,15,25]),
    row=1, col=2
)

fig.add_trace(
    go.Pie(labels=['X','Y','Z'], values=[30,40,30]),
    row=2, col=1
)

fig.add_trace(
    go.Histogram(x=[1,2,2,3,3,3,4,4,4,4,5]),
    row=2, col=2
)

fig.update_layout(
    height=600,
    showlegend=False,
    title_text="Analytics Dashboard"
)
fig.show()
[END_CODE_SNIPPET]

PLOTLY DASH — INTERACTIVE DASHBOARDS

Dash is Plotly's framework for building web applications with interactive visualizations:

Dash Application Structure:
[START_CODE_SNIPPET]
import dash
from dash import dcc, html, Input, Output
import plotly.express as px
import pandas as pd

# Load data
df = px.data.iris()

# Initialize app
app = dash.Dash(__name__)

# Layout
app.layout = html.Div([
    html.H1("Iris Data Dashboard"),
    dcc.Dropdown(
        id='species-dropdown',
        options=[{'label': s, 'value': s} for s in df['species'].unique()],
        value='setosa'
    ),
    dcc.Graph(id='scatter-plot')
])

# Callbacks
@app.callback(
    Output('scatter-plot', 'figure'),
    [Input('species-dropdown', 'value')]
)
def update_plot(selected_species):
    filtered_df = df[df['species'] == selected_species]
    fig = px.scatter(
        filtered_df,
        x='sepal_width',
        y='sepal_length',
        title=f'Species: {selected_species}'
    )
    return fig

# Run app
if __name__ == '__main__':
    app.run_server(debug=True)
[END_CODE_SNIPPET]

ANIMATED VISUALIZATIONS

Plotly supports animations for time-series data:

Animated Chart Example:
[START_CODE_SNIPPET]
import plotly.express as px

# Load gapminder dataset
df = px.data.gapminder()

# Create animated scatter plot
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    animation_frame="year",
    animation_group="country",
    size="pop",
    color="continent",
    hover_name="country",
    log_x=True,
    size_max=60,
    title="GDP vs Life Expectancy Over Time"
)
fig.show()
[END_CODE_SNIPPET]

ADVANCED VISUALIZATION TECHNIQUES

Custom Color Palettes:
[START_CODE_SNIPPET]
# Seaborn palettes
sns.color_palette("viridis", 8)
sns.color_palette("husl", 8)
sns.color_palette("Set2", 8)

# Plotly color scales
px.colors.sequential.Blues
px.colors.sequential.Viridis
px.colors.sequential.Plasma
px.colors.diverging.RdBu
px.colors.qualitative.Set1

# Custom colors in both
custom_colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
[END_CODE_SNIPPET]

Styling and Customization:
[START_CODE_SNIPPET]
# Seaborn theme customization
sns.set_style("whitegrid", {
    "grid.color": ".8",
    "axes.edgecolor": ".15",
    "axes.facecolor": "white",
})

# Plotly layout customization
fig.update_layout(
    template="plotly_dark",
    font=dict(family="Arial, sans-serif", size=14),
    margin=dict(l=40, r=40, t=40, b=40),
    hovermode="x unified"
)

# Plotly axis customization
fig.update_xaxes(
    title_text="X Axis Label",
    showgrid=True,
    gridwidth=1,
    gridcolor='LightGray'
)
[END_CODE_SNIPPET]

CHART SELECTION GUIDELINES

Choosing the Right Chart Type:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Question to Answer</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Recommended Chart</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Library</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the distribution?</td><td class="p-3 border border-cyan/20">Histogram, KDE plot, Box plot</td><td class="p-3 border border-cyan/20">Seaborn, Plotly</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">How do categories compare?</td><td class="p-3 border border-cyan/20">Bar chart, Box plot, Violin plot</td><td class="p-3 border border-cyan/20">Seaborn, Plotly</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the relationship?</td><td class="p-3 border border-cyan/20">Scatter plot, Line chart</td><td class="p-3 border border-cyan/20">Seaborn, Plotly</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the correlation?</td><td class="p-3 border border-cyan/20">Heatmap, Pairplot</td><td class="p-3 border border-cyan/20">Seaborn</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the trend over time?</td><td class="p-3 border border-cyan/20">Line chart, Area chart</td><td class="p-3 border border-cyan/20">Plotly, Seaborn</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the composition?</td><td class="p-3 border border-cyan/20">Pie chart, Stacked bar</td><td class="p-3 border border-cyan/20">Plotly</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the spatial pattern?</td><td class="p-3 border border-cyan/20">Choropleth map, Scatter map</td><td class="p-3 border border-cyan/20">Plotly</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">What is the 3D relationship?</td><td class="p-3 border border-cyan/20">3D scatter, Surface plot</td><td class="p-3 border border-cyan/20">Plotly</td></tr></tbody></table>

BEST PRACTICES FOR EFFECTIVE VISUALIZATION

Design Principles:
1. Know Your Audience: Technical vs non-technical audiences require different levels of detail
2. Choose the Right Chart: Match chart type to the question being asked
3. Keep It Simple: Remove clutter and focus on the message
4. Use Color Effectively: Use color to highlight, not distract
5. Label Clearly: Provide clear titles, axis labels, and legends
6. Tell a Story: Guide the viewer through the data narrative
7. Provide Context: Include annotations, reference lines, and comparisons
8. Ensure Accessibility: Consider color blindness and readability
9. Use Appropriate Scales: Avoid misleading axis truncation
10. Enable Interactivity: Allow users to explore data for deeper insights

Accessibility Guidelines:
- Use colorblind-friendly palettes
- Provide text alternatives for visualizations
- Ensure sufficient contrast ratios
- Include tooltips with detailed information

COMMON VISUALIZATION PATTERNS

Exploratory Data Analysis Pattern:
[START_CODE_SNIPPET]
# Typical EDA workflow
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Load data
df = pd.read_csv('data.csv')

# 2. Distribution checks
sns.histplot(df['target_variable'], kde=True)

# 3. Relationship checks
sns.scatterplot(x='feature1', y='feature2', data=df)

# 4. Correlation analysis
sns.heatmap(df.corr(), annot=True)

# 5. Categorical analysis
sns.boxplot(x='category', y='value', data=df)
[END_CODE_SNIPPET]

Dashboard Pattern:
[START_CODE_SNIPPET]
# Typical dashboard layout with Plotly
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Create dashboard layout
fig = make_subplots(
    rows=3, cols=2,
    specs=[[{"type": "scatter"}, {"type": "bar"}],
           [{"type": "pie"}, {"type": "box"}],
           [{"type": "heatmap"}, {"type": "scatter"}]],
    subplot_titles=("Trend", "Comparison", "Composition", "Distribution", "Correlation", "Relationship")
)
[END_CODE_SNIPPET]

COMMON PITFALLS TO AVOID

1. Misleading Scales: Starting y-axis at non-zero to exaggerate differences
2. Overplotting: Too many data points making charts unreadable (use opacity or sampling)
3. Poor Color Choices: Using colors that don't have enough contrast
4. Chart Junk: Unnecessary visual elements that don't add information
5. Misleading 3D Charts: Using 3D effects when not needed
6. Using the Wrong Chart Type: Mismatching chart to data type
7. Missing Context: Not providing baseline comparisons
8. Overly Complex Charts: Trying to show too much in one chart

TOOL INTEGRATION

Jupyter Notebook Integration:
[START_CODE_SNIPPET]
# Seaborn in Jupyter - automatic rendering
%matplotlib inline

# Plotly in Jupyter
import plotly.io as pio
pio.renderers.default = 'notebook'  # or 'browser'

# For JupyterLab
pio.renderers.default = 'jupyterlab'
[END_CODE_SNIPPET]

Exporting Visualizations:
[START_CODE_SNIPPET]
# Seaborn/Matplotlib exports
plt.savefig('figure.png', dpi=300, bbox_inches='tight')
plt.savefig('figure.pdf', bbox_inches='tight')

# Plotly exports
fig.write_html('chart.html')
fig.write_image('chart.png')  # Requires kaleido or orca
fig.write_json('chart.json')
[END_CODE_SNIPPET]

PERFORMANCE OPTIMIZATION

Large Dataset Handling:
- Use data sampling or aggregation
- Reduce marker sizes and opacity
- Use WebGL for 3D plots
- Enable accelerated rendering in Plotly
- Consider data reduction techniques

Memory Management:
- Clear figures after use: plt.close('all')
- Use fig.show() for Plotly charts
- Reuse figure objects when possible
- Use appropriate data types to reduce memory

CONCLUSION — VISUALIZATION ECOSYSTEM INTEGRATION

Combining Seaborn and Plotly provides a complete visualization toolkit:
- Seaborn: Statistical analysis, publication-quality static plots, EDA
- Plotly: Interactive charts, dashboards, web applications, geospatial
- Pandas: Data preparation and manipulation
- Matplotlib: Customization when needed

The key is knowing when to use each tool:
- Use Seaborn for quick exploratory analysis and reports
- Use Plotly for interactive presentations and dashboards
- Combine both in the same pipeline for maximum effectiveness
- Always consider your audience and the story you're telling
`; 