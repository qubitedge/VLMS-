import { useState } from "react";
import { 
  Trees, ArrowRight, ArrowDown, ArrowUp, AlertTriangle, ShieldAlert, Zap, Clock, Shield, Plus, Trash2, 
  RefreshCw, FastForward, PlayCircle, HardDrive, CheckCircle2, ChevronRight, CornerDownRight,
  Search, ScanLine, Star, Database, Activity, Target
} from "lucide-react";

type CommandTreeProps = {
  expId: string; // ds-e8-1
};

type TreeNode = {
  id: number;
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
};

export function CommandTreeCampaign({ expId }: CommandTreeProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 3000);
  };

  // BST State
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputVal, setInputVal] = useState<number>(50);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Depth-first compute positions
  const computePositions = (node: TreeNode | null, x: number, y: number, xOffset: number) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    computePositions(node.left, x - xOffset, y + 80, xOffset / 1.8);
    computePositions(node.right, x + xOffset, y + 80, xOffset / 1.8);
  };

  if (root) {
    computePositions(root, 400, 50, 160);
  }

  // Insert Logic
  const insertNode = (val: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const newNode: TreeNode = { id: Date.now(), val, left: null, right: null };
    
    if (!root) {
      setRoot(newNode);
      addXp(50, "Tree Root Planted!");
      setIsProcessing(false);
      return;
    }

    const insertAnim = async () => {
      let curr: TreeNode | null = root;
      const newRoot = { ...root };
      let parentObj = newRoot;
      let ptr = newRoot;

      while (curr !== null) {
        setActiveNodes([curr.val]);
        await new Promise(r => setTimeout(r, 600));

        if (val === curr.val) {
          showError("Duplicate Value!");
          setActiveNodes([]);
          setIsProcessing(false);
          return;
        }

        if (val < curr.val) {
          if (!ptr.left) {
            ptr.left = newNode;
            break;
          }
          ptr.left = { ...ptr.left };
          ptr = ptr.left;
          curr = curr.left;
        } else {
          if (!ptr.right) {
            ptr.right = newNode;
            break;
          }
          ptr.right = { ...ptr.right };
          ptr = ptr.right;
          curr = curr.right;
        }
      }
      
      setRoot(newRoot);
      setActiveNodes([val]);
      addXp(20, "Branch Grown");
      await new Promise(r => setTimeout(r, 800));
      setActiveNodes([]);
      setIsProcessing(false);
    };

    insertAnim();
  };

  // Search Logic
  const searchNode = async (val: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setTraversalResult([]);

    let curr = root;
    let found = false;

    while (curr !== null) {
      setActiveNodes([curr.val]);
      await new Promise(r => setTimeout(r, 800));

      if (curr.val === val) {
        found = true;
        break;
      }
      curr = val < curr.val ? curr.left : curr.right;
    }

    if (found) {
      addXp(100, "Citizen Record Found!");
    } else {
      showError("Record Not Found.");
    }

    setTimeout(() => {
      setActiveNodes([]);
      setIsProcessing(false);
    }, 1000);
  };

  // Traversals
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const traverse = async (type: "inorder" | "preorder" | "postorder") => {
    if (isProcessing || !root) return;
    setIsProcessing(true);
    setTraversalResult([]);
    
    const res: number[] = [];
    
    const dfs = async (node: TreeNode | null) => {
      if (!node) return;
      
      if (type === "preorder") {
        setActiveNodes([node.val]);
        res.push(node.val);
        setTraversalResult([...res]);
        await sleep(600);
      }
      
      await dfs(node.left);
      
      if (type === "inorder") {
        setActiveNodes([node.val]);
        res.push(node.val);
        setTraversalResult([...res]);
        await sleep(600);
      }
      
      await dfs(node.right);
      
      if (type === "postorder") {
        setActiveNodes([node.val]);
        res.push(node.val);
        setTraversalResult([...res]);
        await sleep(600);
      }
    };

    await dfs(root);
    addXp(150, `${type} traversal complete`);
    setActiveNodes([]);
    setIsProcessing(false);
  };

  // Rendering the tree
  const drawEdges = (node: TreeNode | null): any => {
    if (!node) return null;
    return (
      <g key={`edges-${node.id}`}>
        {node.left && node.x && node.y && node.left.x && node.left.y && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="currentColor" strokeWidth="3" className="text-border" />
        )}
        {node.right && node.x && node.y && node.right.x && node.right.y && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="currentColor" strokeWidth="3" className="text-border" />
        )}
        {drawEdges(node.left)}
        {drawEdges(node.right)}
      </g>
    );
  };

  const drawNodes = (node: TreeNode | null): any => {
    if (!node) return null;
    const isActive = activeNodes.includes(node.val);
    const inResult = traversalResult.includes(node.val);
    
    return (
      <div key={node.id}>
        {drawNodes(node.left)}
        {drawNodes(node.right)}
        <div 
          className={`absolute size-14 -ml-7 -mt-7 rounded-full flex items-center justify-center font-bold text-lg shadow-xl border-4 transition-all duration-300 z-10
            ${isActive ? 'bg-primary border-primary-foreground text-primary-foreground scale-125' : 
              inResult ? 'bg-green-500 border-green-200 text-white' : 
              'bg-secondary border-primary text-foreground'}
          `}
          style={{ left: node.x, top: node.y }}
        >
          {node.val}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <Trees className="size-6 text-primary" /> Command Tree District
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             Mission: Binary Search Tree Operations
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
         
         {/* Tree Visualization */}
         <div className="flex-[2.5] bg-card rounded-lg border border-border p-6 flex flex-col relative overflow-auto">
            {traversalResult.length > 0 && (
              <div className="absolute top-6 left-6 z-20 bg-background/90 p-4 rounded-xl border border-border shadow-lg backdrop-blur">
                <h4 className="font-bold text-sm text-muted-foreground mb-2">Traversal Result:</h4>
                <div className="flex gap-2 flex-wrap max-w-sm">
                  {traversalResult.map((val, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 text-green-500 font-bold rounded border border-green-500/30">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="relative w-[800px] h-[600px] mx-auto mt-10">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 {drawEdges(root)}
              </svg>
              {drawNodes(root)}
              {!root && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                  <Trees className="size-24 text-muted-foreground mb-4" />
                  <h2 className="text-2xl font-bold text-muted-foreground">The Command Tree is Empty</h2>
                </div>
              )}
            </div>
         </div>
         
         {/* Controls */}
         <div className="flex-[1] bg-secondary/30 p-6 rounded-xl border border-border flex flex-col overflow-y-auto">
            <h3 className="font-bold mb-6 text-xl border-b border-border pb-2">Tree Architect Console</h3>
            
            <div className="flex gap-2 mb-6">
              <input type="number" value={inputVal} onChange={e=>setInputVal(Number(e.target.value))} className="w-full bg-background border border-border rounded-lg px-4 font-bold text-center" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-8">
               <button onClick={() => insertNode(inputVal)} disabled={isProcessing} className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex flex-col items-center justify-center disabled:opacity-50 text-sm">
                 <ArrowDown className="size-5 mb-1" /> Insert
               </button>
               <button onClick={() => searchNode(inputVal)} disabled={isProcessing || !root} className="py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex flex-col items-center justify-center disabled:opacity-50 text-sm">
                 <Search className="size-5 mb-1" /> Search
               </button>
            </div>
            
            <h4 className="font-bold text-sm text-muted-foreground mb-4">CITY DATA TRAVERSALS</h4>
            <div className="flex flex-col gap-3">
               <button onClick={() => traverse("inorder")} disabled={isProcessing || !root} className="py-3 bg-secondary border border-border hover:bg-secondary/80 font-bold rounded-lg text-sm text-left px-4 flex justify-between items-center group">
                 <span>Inorder (Left, Root, Right)</span>
                 <ChevronRight className="size-4 opacity-0 group-hover:opacity-100" />
               </button>
               <button onClick={() => traverse("preorder")} disabled={isProcessing || !root} className="py-3 bg-secondary border border-border hover:bg-secondary/80 font-bold rounded-lg text-sm text-left px-4 flex justify-between items-center group">
                 <span>Preorder (Root, Left, Right)</span>
                 <ChevronRight className="size-4 opacity-0 group-hover:opacity-100" />
               </button>
               <button onClick={() => traverse("postorder")} disabled={isProcessing || !root} className="py-3 bg-secondary border border-border hover:bg-secondary/80 font-bold rounded-lg text-sm text-left px-4 flex justify-between items-center group">
                 <span>Postorder (Left, Right, Root)</span>
                 <ChevronRight className="size-4 opacity-0 group-hover:opacity-100" />
               </button>
            </div>
            
            <button onClick={() => setRoot(null)} disabled={isProcessing} className="mt-auto py-3 border border-red-500 text-red-500 hover:bg-red-500/10 font-bold rounded-lg flex items-center justify-center gap-2">
              <Trash2 className="size-4" /> Clear Tree
            </button>
         </div>

      </div>
    </div>
  );
}
