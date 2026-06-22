import { Experiment } from "./course-data";

export const aiM1Experiments: Experiment[] = [
  {
    id: "ai-m1-1",
    title: "Gemini Imagen Photorealism",
    desc: "Generate a photorealistic scene using Gemini Imagen and evaluate prompt sensitivity.",
    expected: "A high-resolution photorealistic image matching the described scene with accurate lighting, texture, and composition.",
    content: {
      aim: {
        text: "To use Google's Imagen model via the Gemini platform to generate highly photorealistic images from detailed text prompts, exploring how prompt specificity, lighting descriptors, and subject detail directly influence output quality and realism.",
        bullets: [
          "Understand how Gemini Imagen uses cascaded diffusion models to produce high-resolution photorealistic outputs",
          "Craft prompts that explicitly target photorealism using lighting descriptors, camera terminology, and scene context",
          "Observe how Imagen handles human subjects, architectural scenes, and natural environments",
          "Compare outputs from weak versus strong prompts on the same subject",
          "Understand Imagen's integration within the Google ecosystem and its API accessibility",
          "Identify limitations such as text rendering accuracy and complex multi-subject compositions",
          "Reflect on ethical considerations specific to photorealistic AI generation including deepfakes and misinformation"
        ]
      },
      theory: [
            {
                  "title": "What Makes Imagen Special?",
                  "body": [
                        "Imagen is Google's text-to-image model built for photorealism \u2014 outputs that look like actual photographs rather than illustrations. It was trained on billions of image-text pairs, learning to connect words like 'golden hour lighting' or 'shallow depth of field' to real visual qualities.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Prompt Element</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Controls</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Subject</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">What is in the image</td><td class=\"p-3 text-muted-foreground\">'A golden retriever sitting on grass'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Lighting</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Mood and atmosphere</td><td class=\"p-3 text-muted-foreground\">'soft morning light', 'studio lighting'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Camera style</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Depth and framing</td><td class=\"p-3 text-muted-foreground\">'shallow depth of field', '35mm lens'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Quality tag</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Forces high detail</td><td class=\"p-3 text-muted-foreground\">'ultra-realistic', '8K', 'DSLR photo'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Prompt Engineering for Images",
                  "body": [
                        "Basic prompt 'a dog'  \u2192  Add subject detail  \u2192  Add lighting & style  \u2192  Add quality tags  \u2192  Photorealistic result",
                        "![Gemini Imagen Photorealism](/aitools_exp1.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand the cascaded diffusion architecture and the role of T5 text conditioning in Imagen.",
        "On paper, write two versions of a prompt for the same subject — one weak (under 5 words) and one strong (including camera, lighting, scene detail, and quality markers).",
        "Predict which prompt will produce the more photorealistic output and note your reasoning before generating.",
        "Open the Solve tab and navigate to the Gemini Imagen workspace.",
        "Enter your weak prompt first. Observe and note the output — composition, lighting accuracy, texture quality, and overall realism.",
        "Enter your strong prompt for the same subject. Observe and compare — note specific improvements in lighting, detail, and spatial coherence.",
        "Generate a photorealistic architectural scene using the prompt: \"A modern glass office building in Hyderabad at sunrise, reflections of orange clouds on the glass facade, surrounding greenery, wide-angle shot, photorealistic, ultra-detailed, 8K\"",
        "Generate a natural environment scene: \"A misty rainforest waterfall in the Western Ghats, morning light filtering through dense canopy, wet mossy rocks, macro detail, photorealistic, shot on Sony A7R IV\"",
        "Generate a human subject scene: \"A street food vendor in Mumbai at night, warm tungsten lighting from a stall lamp, steam rising from a pan, candid shot, photorealistic, 50mm lens, cinematic\"",
        "Observe the handling of human faces, hands, and text in signboards if present. Note any artifacts or inaccuracies.",
        "Try adding a negative prompt such as \"blurry, cartoon, illustration, watermark, low quality\" and observe the difference in output quality.",
        "Document all outputs and your comparative observations for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Saharia C. et al., Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding (Imagen Paper), Google Research, 2022",
        "Ho J. et al., Cascaded Diffusion Models for High Fidelity Image Generation, NeurIPS 2022",
        "Raffel C. et al., Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (T5), JMLR 2020",
        "Google Vertex AI Imagen Documentation: https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview",
        "Google Gemini Imagen Interface: https://gemini.google.com",
        "JNTUGV AI Tools Lab Syllabus, Module 1 — Image Generation Lab"
      ]
    }
  },
  {
    id: "ai-m1-2",
    title: "DALL·E Concept Art",
    desc: "Create concept art using DALL·E with iterative prompt refinement.",
    expected: "A stylistically rich concept art image accurately representing the described metaphorical scene with the specified color palette and mood.",
    content: {
      aim: {
        text: "To leverage OpenAI's DALL-E model to generate stylised concept art by experimenting with artistic style descriptors, medium references, and compositional framing instructions, understanding how abstract creative direction translates into visual output.",
        bullets: [
          "Understand how DALL·E 3 improves on earlier versions through tighter prompt adherence and natural language understanding",
          "Generate concept art for fictional characters, environments, and objects using structured prompts",
          "Explore iterative generation — refining prompts based on previous outputs to converge toward a desired result",
          "Understand DALL·E's integration with ChatGPT and how conversational context influences image generation",
          "Compare DALL·E outputs with photorealistic tools and identify the qualitative difference in creative vs realistic generation",
          "Apply DALL·E to a practical CSE use case — generating UI mockup illustrations, app concept screens, or technical diagram art",
          "Reflect on copyright, originality, and attribution concerns specific to AI-generated concept art"
        ]
      },
      theory: [
            {
                  "title": "DALL-E and Artistic Styles",
                  "body": [
                        "DALL-E excels at concept art and stylised illustration. You can tell it to paint like a specific era, medium, or artistic movement and it will blend those aesthetics into a single image.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Style Descriptor</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What You Get</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'watercolour illustration'</td><td class=\"p-3 text-muted-foreground\">Soft, blended painterly look</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'oil painting, baroque style'</td><td class=\"p-3 text-muted-foreground\">Rich, dramatic, classical art</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'flat vector art'</td><td class=\"p-3 text-muted-foreground\">Clean minimal graphic design</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'cyberpunk concept art'</td><td class=\"p-3 text-muted-foreground\">Neon, futuristic, gritty urban scenes</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'Studio Ghibli style'</td><td class=\"p-3 text-muted-foreground\">Warm, hand-drawn anime aesthetic</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Concept Art Workflow",
                  "body": [
                        "Define the concept / idea  \u2192  Choose an artistic style  \u2192  Add mood & composition  \u2192  Iterate with variations  \u2192  Final concept art",
                        "![DALL-E Concept Art](/aitools_exp2.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand DALL·E 3's recaptioning training approach, its conversational refinement capability, and its content policy.",
        "On paper, write a concept art brief for a fictional subject of your choice — a character, environment, or object relevant to a CSE or tech theme.",
        "Structure your brief into prompt components: subject, setting, style, lighting, mood, and composition.",
        "Open the Solve tab and navigate to the DALL·E workspace.",
        "Enter your first prompt and generate the image. Observe how well DALL·E interprets the concept.",
        "Identify one specific element that does not match your intent. Write a follow-up refinement instruction in plain language.",
        "Generate the refined version and compare. Document the delta.",
        "Generate concept art for the fixed brief: \"A neural network visualized as a glowing tree with roots made of binary code growing into a dark digital soil, branches forming interconnected nodes...\"",
        "Attempt the same prompts with a significantly stripped-down version and compare outputs side by side.",
        "Document all images and observations for the Feedback Report."
      ],
      posttest: [],
      references: [
        "OpenAI DALL·E 3 Technical Report, OpenAI, 2023",
        "Betker J. et al., Improving Image Generation with Better Captions (DALL·E 3 paper), OpenAI Research, 2023",
        "ChatGPT with DALL·E Interface: https://chatgpt.com",
        "JNTUGV AI Tools Lab Syllabus, Module 1 — Image Generation Lab"
      ]
    }
  },
  {
    id: "ai-m1-3",
    title: "Leonardo AI Character Design",
    desc: "Produce stylized character designs using Leonardo AI and explore style presets.",
    expected: "A stylized full-body character concept with strong aesthetic consistency matching the selected style model, accurate costume detail, and minimal anatomy artifacts.",
    content: {
      aim: {
        text: "To use Leonardo AI's fine-tuned models to design consistent, detailed characters by crafting structured character description prompts covering appearance, costume, emotion, and pose \u2014 and to explore how model selection affects stylistic consistency across multiple character renders.",
        bullets: [
          "Understand how Leonardo AI is built on Stable Diffusion and extended through fine-tuned models and LoRA adaptors",
          "Apply style presets to generate characters in game art, anime, concept art, and photorealistic styles",
          "Use negative prompts effectively to eliminate common visual artifacts",
          "Control generation parameters including inference steps, guidance scale, and aspect ratio",
          "Use the Canvas tool to make targeted edits to generated character images",
          "Generate a consistent character across multiple poses using prompt engineering strategies"
        ]
      },
      theory: [
            {
                  "title": "Why Leonardo for Characters?",
                  "body": [
                        "Leonardo AI offers specialised fine-tuned models \u2014 versions trained specifically on character art, game assets, or anime. This means you get much more consistent results for the same character across multiple images compared to general-purpose models.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Character Prompt Layer</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What to Describe</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Appearance</td><td class=\"p-3 text-muted-foreground\">Hair colour, eye colour, skin tone, age, body type</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Costume</td><td class=\"p-3 text-muted-foreground\">Clothing style, colours, materials, accessories</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Emotion</td><td class=\"p-3 text-muted-foreground\">'Determined expression', 'joyful smile', 'fierce gaze'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Pose</td><td class=\"p-3 text-muted-foreground\">'Standing heroically', 'crouching', 'arms crossed'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Background</td><td class=\"p-3 text-muted-foreground\">'Plain white', 'fantasy forest', 'studio backdrop'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Consistency Across Renders",
                  "body": [
                        "Write detailed character sheet  \u2192  Select a consistent model  \u2192  Lock style descriptors  \u2192  Generate multiple poses  \u2192  Same character every time",
                        "![Leonardo AI Character Design](/aitools_exp3.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand the Stable Diffusion foundation and Leonardo's tools.",
        "Decide on a character concept for your design session (e.g., cyberpunk hacker, medieval alchemist).",
        "Open the Solve tab and navigate to the Leonardo AI workspace.",
        "In the model selector, choose a fine-tuned model appropriate for your character's aesthetic.",
        "Enter a base character prompt. Set Inference Steps = 30, Guidance Scale = 8, Aspect Ratio = 2:3, and add a negative prompt.",
        "Generate the character. Evaluate the output critically.",
        "Apply a different style model or LoRA to the same prompt and regenerate. Compare the outputs.",
        "Use the Canvas inpainting tool to fix any artifacts in the face or hands.",
        "Generate a headshot variant of the same character by changing the aspect ratio to 1:1 and modifying the prompt.",
        "Document all generations and parameter settings for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Rombach R. et al., High-Resolution Image Synthesis with Latent Diffusion Models, CVPR 2022",
        "Leonardo AI Platform: https://leonardo.ai",
        "JNTUGV AI Tools Lab Syllabus, Module 1 — Image Generation Lab"
      ]
    }
  },
  {
    id: "ai-m1-4",
    title: "Midjourney Artistic Composition",
    desc: "Generate a high-detail artistic composition using Midjourney and compare with other tools.",
    expected: "A stylistically sophisticated composition utilizing aspect ratio, stylization, and varied parameter settings.",
    content: {
      aim: {
        text: "To use Midjourney's advanced compositional controls \u2014 including aspect ratio flags, stylisation parameters, and negative prompts \u2014 to craft intentional artistic compositions that demonstrate mastery of visual balance, colour palette direction, and aesthetic coherence.",
        bullets: [
          "Understand Midjourney's proprietary model architecture",
          "Use Midjourney's parameter syntax including --ar, --stylize, --chaos, --v, and --no flags",
          "Apply the grid, upscale, and variation workflow to iteratively select and refine the best output",
          "Generate compositionally complex images with strong visual storytelling",
          "Use image prompting to influence generation style and composition from a reference image",
          "Compare Midjourney output quality and aesthetic character against DALL·E and Leonardo AI"
        ]
      },
      theory: [
            {
                  "title": "Midjourney's Unique Parameters",
                  "body": [
                        "Midjourney uses special command flags alongside your prompt to control the technical and artistic properties of the output.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Parameter</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">--ar</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Sets aspect ratio</td><td class=\"p-3 text-muted-foreground\">--ar 16:9 (widescreen), --ar 1:1 (square)</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">--stylize</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Controls artistic intensity</td><td class=\"p-3 text-muted-foreground\">--stylize 100 (subtle) to 1000 (very painterly)</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">--no</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Negative prompt \u2014 excludes</td><td class=\"p-3 text-muted-foreground\">--no text, --no people, --no blur</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">--v</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Model version</td><td class=\"p-3 text-muted-foreground\">--v 6 (latest, most detailed)</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">--chaos</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Variation randomness</td><td class=\"p-3 text-muted-foreground\">--chaos 0 (consistent) to 100 (wild)</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Building a Composed Prompt",
                  "body": [
                        "Subject + scene  \u2192  Mood & colour palette  \u2192  Art style descriptor  \u2192  Add --ar --stylize --no  \u2192  Coherent composition",
                        "![Midjourney Artistic Composition](/aitools_exp4.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand the Midjourney workflow and parameters.",
        "Log into the Midjourney workspace.",
        "Create an initial composition using --ar and --stylize parameters.",
        "Refine the output using the V1-V4 variations workflow.",
        "Upscale the final chosen output with the U1-U4 buttons.",
        "Record the aesthetic differences compared to other tools for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Midjourney Documentation: https://docs.midjourney.com",
        "JNTUGV AI Tools Lab Syllabus, Module 1 — Image Generation Lab"
      ]
    }
  }
];

// Trigger HMR