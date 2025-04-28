import express ,{Request,Response} from "express";
import fs from "fs";
import path from "path";

const productRoute = express.Router();

const productFile = path.join(__dirname,"../product.json");

// Định nghĩa interface cho sản phẩm
interface Product {
    id : number, //kiểu số
    name : string, // kiểu chuỗi
    price : number, //kiểu số
    category : string //kiểu chuỗi
}

//đọc dữ liệu sản phẩm
const readProduct = (): Product[]=>{
    const data = fs.readFileSync(productFile,"utf8")
    return JSON.parse(data)
};

// viết dữ liệu 
const writeFile = (data: Product[]): void =>{
    fs.writeFileSync(productFile, JSON.stringify(data,null,2))
}

// lấy tất cả sản phẩm
productRoute.get("/",(req : Request,res : Response)=>{
    const products = readProduct();
    res.json(products)
})

// thêm sản phẩm mới
productRoute.post("/",(req: Request, res: Response)=>{
    const products = readProduct();
    const newProduct : Product ={
        id : products.length ? products[products.length - 1].id + 1: 1,
        ...req.body
    }
    products.push(newProduct);
    writeFile(products);
    res.status(201).json(newProduct);
});

// Edit sản phẩm 
productRoute.put("/:id",(req:Request , res: Response)=>{
    const productId = parseInt(req.params.id);
    const products = readProduct();
    const productIndex = products.findIndex(product => product.id === productId);

    if(productIndex !== -1){
        products[productIndex] = {
            ...products[productIndex],
            ...req.body
        };
        writeFile(products);
        res.status(200).json({ message: "Product updated successfully", product: products[productIndex] });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Xóa sản phẩm 
productRoute.delete("/:id",(req:Request , res: Response)=>{
    const productId = parseInt(req.params.id);
    const products = readProduct();
    
    const filteredProduct = products.filter(product => product.id !== productId);

    if (products.length !== filteredProduct.length) {
        writeFile(filteredProduct);
        res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// lấy theo íd
productRoute.get("/:id", (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const products = readProduct();
    const product = products.find(p => p.id === productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
export default productRoute;