/**
 * NODEJS OVERVIEW
 * 1. Mô hình client_server 
 * client : máy khách , thiết bị có kết nối internet mà người dùng sử dụng để truy cập ( http request)
 * server : máy chủ cấu thành từ cup ram,hdd,.. là nơi xử lý và lưu trữ dữ liệu chung của hệ thống đóng vai trò trung gian giao tiếp giữa các client với nhau (http response)
 * kết nối với nhau thông qua  "http" (hypertext transfer protocol)
 * 2. Tổng quan về nodejs
 * là một môi trường để chạy js trên máy tính ko cần thông quan trình duyệt
 * đặc điểm:
 * Mô hình IO không đông bộ : Nodejs họa động theo cơ chế non_blocking IO , tức là các tác vụ IO như đọc. ghi file, kết nối mạng , truy vấn cơ sở dữ liệu,.. được thực hiện đồng bộ ,cho phép nodejs xử lí nhiều yêu cầu cùng lúc không bị chặn blocking
 * Single_threaded( một luồng): chỉ chạy một luồng duy nhất , nhưng nhờ mô hình không đồng bộ và event-driven, nó co thể xử lí hàng ngàn kết nối đồng thời một cách hiệu quả mà không cần tạo ra một luồng mới cho mỗi kết nối
 * Event- driven ( hướng sự kiện) : sử dụng mô hình sự kiện để xử ký các tác vụ .Khi một tác vụ hoàn thành , một sự kiện sẽ được kích hoạt và các hàng callback liên quan sẽ đươc thực thi, giúp tối ưu hiệu suất
 * Sử dụng JS : cho phép lập trình viên sư dụng js để viết mã phía máy chủ (server-side) điều này giúp dễ dàng hơn cho những người đã quen JS trên trình duyệt để phát hiệ toàn bộ ứng dụng web từ frontend đến backend bằng một ngôn ngữ duy nhất
 * NPM (NODE PACKAGE MANAGER ): nodejs đi kèm với trình quản lí gói npm , đây là kho chứa hàng ngàn thư viện mã nguồn mở để hỗ trợ các lập trình viên phát triển ứng dụng một cách nhanh chóng,NPM giúp dễ dàng cài đặt , quản lý các module và thư viện cần thiết của ứng dụng
 * Các ứng dụng của NodeJS:
 * API server: NodeJS thường được sử dụng để xây dựng các API RESTful, GraphQL, vì nó rất phù hợp cho các ứng dụng cần xử lý I/O nhanh và hiệu quả.
 * Ứng dụng thời gian thực (Real-time applications): Với hỗ trợ WebSocket và khả năng xử lý nhiều kết nối cùng lúc, NodeJS rất phù hợp cho các ứng dụng chat, livestream, hoặc game đa người chơi.
 * Microservices: NodeJS được sử dụng nhiều trong kiến trúc microservices, nơi các dịch vụ nhỏ, độc lập được phát triển và triển khai một cách riêng biệt.
 * Ứng dụng mạng xã hội và giao tiếp: NodeJS thường được sử dụng trong các ứng dụng mạng xã hội hoặc nền tảng giao tiếp như Slack, Trello, và phần lớn các ứng dụng tương tự do khả năng xử lý đồng thời cao.
 * So sánh NodeJS và Javascript Browser
Môi trường thực thi: 
NodeJS: Chạy trên máy chủ, bên ngoài trình duyệt. NodeJS sử dụng engine V8 của Google Chrome nhưng không có các API liên quan đến DOM hoặc giao diện người dùng.
JavaScript trên trình duyệt: Chạy trên client (trình duyệt) và có quyền truy cập vào DOM, giao diện người dùng, và các API trình duyệt như localStorage, fetch, v.v.
Tính năng và API
NodeJS: 
Hỗ trợ các module hệ thống tập tin, module mạng (fs, http, net).
Có thể đọc, ghi tệp tin, quản lý hệ thống tệp.
Hỗ trợ thao tác với mạng như tạo server HTTP, quản lý kết nối TCP/UDP.
Không có quyền truy cập vào DOM hoặc các tính năng liên quan đến giao diện người dùng.
JavaScript trên trình duyệt:
Có quyền truy cập vào DOM để thao tác giao diện người dùng.
Hỗ trợ các tính năng trình duyệt như localStorage, sessionStorage, fetch để thực hiện yêu cầu HTTP.
Không có quyền truy cập trực tiếp vào hệ thống tập tin hoặc mạng.
Quản lý gói và module:
NodeJS:
Sử dụng hệ thống module CommonJS (require, module.exports).
Hỗ trợ trình quản lý gói NPM (Node Package Manager), cho phép cài đặt và sử dụng các thư viện JavaScript từ NPM.
JavaScript trên trình duyệt:
Sử dụng hệ thống module ECMAScript (ES6 module) với cú pháp import và export.
Trình duyệt có thể tải các script từ các nguồn CDN hoặc từ local file, nhưng không sử dụng NPM như NodeJS.
Sử dụng:
NodeJS:
Thích hợp cho phát triển backend, như xây dựng API, server, quản lý cơ sở dữ liệu, xử lý file, và các tác vụ phía máy chủ.
Được sử dụng nhiều cho các ứng dụng thời gian thực (real-time) như chat, stream video, hoặc xử lý dữ liệu lớn.
JavaScript trên trình duyệt:
Thích hợp cho phát triển frontend, nơi cần thao tác với giao diện người dùng, xử lý sự kiện, và tương tác trực tiếp với người dùng.
Dùng để phát triển giao diện người dùng động, các ứng dụng web tương tác, và cải thiện trải nghiệm người dùng.
Non-blocking I/O:
NodeJS: Được thiết kế để xử lý I/O không đồng bộ (non-blocking I/O) rất hiệu quả, đặc biệt trong các tình huống xử lý nhiều kết nối đồng thời, nhờ vào mô hình event-driven và single-threaded.
JavaScript trên trình duyệt: Cũng hỗ trợ các thao tác không đồng bộ, chẳng hạn như thông qua Promises, async/await, nhưng không được thiết kế tối ưu hóa cho các tác vụ máy chủ hoặc xử lý nhiều kết nối.
Quản lý bộ nhớ:
NodeJS: Có khả năng truy cập vào bộ nhớ và hệ thống tệp của máy chủ. Các tiến trình và tài nguyên được quản lý một cách độc lập.
JavaScript trên trình duyệt: Có hạn chế về bộ nhớ và tài nguyên do chạy trong môi trường trình duyệt với các quy tắc bảo mật (sandboxed environment), nhằm ngăn chặn việc truy cập trái phép vào tài nguyên hệ thống.

Kết luận: 
NodeJS: Phù hợp cho phát triển backend, xây dựng server, quản lý hệ thống tệp, xử lý I/O hiệu quả.
JavaScript trên trình duyệt: Phù hợp cho phát triển frontend, xây dựng giao diện người dùng và tương tác với DOM.
=> Mặc dù cùng sử dụng ngôn ngữ JavaScript, NodeJS và JavaScript trên trình duyệt phục vụ cho hai mục đích và môi trường khác nhau.

 * 3. Thiết lập môi trường làm việc 
npm init -y
 * 4. Các quan niệm về backend
- server: một máy chủ xử lý các yêu cầu từ client trả về phản hồi , thường bao gồm các tác vụ như xử lý dữ liệu , xác thực và phản hồi lại dưới dang API hoặc trang web
Chức năng  : lưu trữ xử lý dữ liệu yêu cầu rừ clien tvaf gửi phản hồi quản lý kết nối bảo mật
- API : là một tập hợp các quy tắc và giao thức cho phép các phần mềm khác nhau giao tiếp với nhau. nó định nghĩa cách mà các thành phần mên tương tác với nahu, gửi dữ liệu
chức năng : cung cấp một giao dieejnddeer các ứng dụng có thể gọi và sử dụng các chức năng của nhau 
tăng tính khả dụng và dễ bảo trì cho phần mềm bằng cách tách biệt các chức năng 
- Service : là một phần mền hoặc một chức năng  cụ thể thực hiện một nhiệm vụ hoặc cung cấp một dịch vụ cụ thể . Nó có thể hoạt động độc lập hoặc tương tác với các server khác
chức năng : cung cấp các chức năng hoặc dịch vụ cho client hoặc server khác
có thể được triể khai dưới dạng microservices hoặc mônlith
- Restful API : là một kiểu api tuân thủ theo quy tắc rest ( representatiom state transfer ).Nó sử dụng các phương thức HTTP để thực hiện các thao tác trên tài nguyên 
Đặc điểm chính :
  + stateless mỗi yêu cần từ client đến server phải chứa tất cả thông tin cần thiết để  server hiểu và xử lý yêu cầu, không lưu trữ thông tin trạng thái giữa các yêu cầu 
  + Client- server: tách biệt giữa client và server cho phép đọc lập thực hiện và triển khai 
  + cacheable : các phản hồi từ server có thể được lưu trữ để giảm tải cho server
  + Uniform Interface : cung cấp một giao diện đòng nhất cho việc tương tác với các tài nguyên , thườn g thông qua url và các phương thức HTTP ( POST , GET ,PUT , DELETE, PATCH)
 * 5. thực hành 
 * 6. Bài tập
- Mục tiêu: Xây dựng một ứng dụng quản lý kho sách cho phép người dùng quản lý thông tin sách và tác giả. Ứng dụng này nên có khả năng thực hiện các thao tác CRUD (Tạo, Đọc, Cập nhật, Xóa) trên cả hai loại dữ liệu.
- Chức năng chính:
Quản lý tác giả
Thêm tác giả: Cho phép thêm một tác giả mới vào hệ thống. 
Lấy danh sách tác giả: Hiển thị danh sách tất cả các tác giả. 
Cập nhật thông tin tác giả: Cập nhật thông tin của một tác giả theo ID. 
Xóa tác giả: Xóa một tác giả theo ID.
Quản lý sách:
Thêm sách: Cho phép thêm một sách mới vào hệ thống, bao gồm cả thông tin về tác giả. 
Lấy danh sách sách: Hiển thị danh sách tất cả các sách kèm theo thông tin tác giả. 
Cập nhật thông tin sách: Cập nhật thông tin của một sách theo ID. 
Xóa sách: Xóa một sách theo ID
Tìm kiếm sách:
Cho phép người dùng tìm kiếm sách theo tiêu đề hoặc theo tên tác giả.
Ghi log hoạt động:
Ghi lại các thao tác thêm, sửa, xóa vào một file log cho cả sách và tác giả.
Dữ liệu:
Dữ liệu Tác Giả (Author)
ID: (số nguyên) Định danh duy nhất cho tác giả.
Tên: (chuỗi) Tên của tác giả.
Quốc gia: (chuỗi) Quốc gia của tác giả.
Ngày sinh: (ngày) Ngày sinh của tác giả.
Dữ liệu Sách (Book)
ID: (số nguyên) Định danh duy nhất cho sách.
Tiêu đề: (chuỗi) Tiêu đề của sách.
Tác giả: (số nguyên) ID của tác giả (liên kết đến bảng tác giả).
Thể loại: (chuỗi) Thể loại của sách (ví dụ: Tiểu thuyết, Khoa học, Giáo dục).
Năm xuất bản: (số nguyên) Năm xuất bản của sách.
Số trang: (số nguyên) Số trang của sách.
 */

// const http = require("http") // import module http cho phép chúng ta tạo ra một server HTTP và xử lý các yêu cầu mạng.

// const server = http.createServer((req,res)=>{//Hàm này tạo ra một server HTTP mới. Nó nhận vào một callback function với hai tham số: req (request) và res (response).
// // req: Đại diện cho yêu cầu từ client, chứa thông tin như URL, phương thức (GET, POST, v.v.), tiêu đề, và dữ liệu gửi đi.
// // res: Đại diện cho đối tượng phản hồi mà server sẽ gửi lại cho client.
//     res.statusCode = 200;// HTTP là 200, nghĩa là yêu cầu thành công.
//     res.setHeader("Content-Type","text/plain")//Thiết lập tiêu đề phản hồi Content-Type với giá trị là text/plain, điều này thông báo cho client rằng nội dung phản hồi là văn bản thuần túy.
//     res.end("Hello my mom")// Gửi phản hồi về client
// });
// const PORT = 3000;//Dinh nghia cong chay o dau
// server.listen(PORT,()=>{//Bắt đầu lắng nghe trên cổng 3000. Hàm này nhận vào cổng và một callback function sẽ được gọi khi server bắt đầu lắng nghe.

//     console.log(`Server running at http://localhost:${PORT}`)//In ra console thông báo rằng server đang chạy và có thể được truy cập qua URL http://localhost:3000/.

// })


/**
 * Đối tượng res (response) dùng để gửi phản hồi từ server về cho client. Dưới đây là một số phương thức và thuộc tính quan trọng:
res.status(code): Đặt mã trạng thái HTTP cho phản hồi.
Ví dụ: res.status(404).send('Not Found');
res.set(header, value): Thiết lập một tiêu đề (header) cho phản hồi.
Ví dụ: res.set('Content-Type', 'application/json');
res.send(body): Gửi phản hồi về client. Có thể gửi chuỗi, đối tượng, mảng, v.v.
Ví dụ: res.send('Hello, World!');
res.json(data): Gửi phản hồi dạng JSON. Tự động thiết lập Content-Type là application/json.
Ví dụ: res.json({ message: 'Success', data: {...} });
res.end(): Kết thúc phản hồi và gửi về client. Có thể không có tham số.
Ví dụ: res.end('Goodbye!');
res.redirect(url): Chuyển hướng client đến một URL khác.
Ví dụ: res.redirect('http://example.com');
res.render(view, options) (thường sử dụng với thư viện như express): Kết xuất một view template và gửi phản hồi về client.
Ví dụ: res.render('index', { title: 'Home' });

 */
const { logAction } = require('./logger');
const fs = require('fs')
const path = require('path');
const http = require("http")

const PORT = 3000;

const dataFilePath = path.join(__dirname, "data.json");
const authorFilePath = path.join(__dirname, "author.json");
const bookFilePath = path.join(__dirname, "book.json");

console.log("dataFilePath", dataFilePath)

const readData = () => {
    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data);
};
const readAuthorData = () => {
    const data = fs.readFileSync(authorFilePath, "utf8")
    return JSON.parse(data);
};
const readBookData = () => {
    const data = fs.readFileSync(bookFilePath, "utf8")
    return JSON.parse(data);
};

const writeFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)) // 2 là space khoảng cách giữa các từ
};
const writeAuthorFile = (data) => {
    fs.writeFileSync(authorFilePath, JSON.stringify(data, null, 2)) // 2 là space khoảng cách giữa các từ
};
const writeBookFile = (data) => {
    fs.writeFileSync(bookFilePath, JSON.stringify(data, null, 2)) // 2 là space khoảng cách giữa các từ
};
const server = http.createServer((req, res) => {
    const {method, url} = req;
    let body = '';

    if (url.startsWith('/users')) {
        req.on('data', (data) => {
            body += data.toString();
        })
        req.on("end", () => {
            if (method === 'GET') { // lay tat ca nguoi dung
                const users = readData();
                res.writeHead(200, {'Content-Type': " application/json"})
                res.end(JSON.stringify(users))
            }
            if (method === 'POST') { // tao nguoi dung moi
                const users = readData();
                const newUser = JSON.parse(body);
                newUser.id = users.length ? users[users.length - 1].id + 1 : 1 // id tu dong tang
                users.push(newUser);
                writeFile(users);
                res.writeHead(201, {'Content-Type': " application/json"})
                res.end(JSON.stringify(users))
            }
            if (method === 'PUT') { // cap nhat nguoi dung hien tai
                const users = readData();
                const userId = parseInt(url.split('/')[2]);
                const updateUser = JSON.parse(body);
                const userIndex = users.findIndex((user) => user.id === userId);

                if (userIndex !== -1) {
                    users[userIndex] = {
                        id: userId,
                        ... updateUser
                    };
                    writeFile(users);
                    res.writeHead(201, {'Content-Type': " application/json"})
                    res.end(JSON.stringify(users[userIndex]))
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
            if (method === 'DELETE') { // xoa nguoi dung
                const users = readData();
                const userId = parseInt(url.split('/')[2]);
                const filteredUser = users.filter((user) => user.id !== userId);

                if (users.length !== filteredUser.length) {
                    writeFile(filteredUser);
                    res.writeHead(204);
                    res.end(JSON.stringify({message: 'OK'}));
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
        })
    } 
    else if (url.startsWith('/author')) {
        req.on('data', (data) => {
            body += data.toString();
        });
        req.on("end", () => {
            if (method === 'GET') { // lay tat ca tac gia
                const authors = readAuthorData();
                res.writeHead(200, {'Content-Type': " application/json"})
                res.end(JSON.stringify(authors))
            }
            if (method === 'POST') { // tao tac gia moi
                const authors = readAuthorData();
                const newAuthor = JSON.parse(body);
                newAuthor.id = authors.length ? authors[authors.length - 1].id + 1 : 1 // id tu dong tang
                authors.push(newAuthor);
                writeAuthorFile(authors);
                logAction("ADD_AUTHOR", newAuthor);
                res.writeHead(201, {'Content-Type': " application/json"})
                res.end(JSON.stringify(newAuthor))
            }
            if (method === 'PUT') { // cap nhat tac gia hien tai
                const authors = readAuthorData();
                const authorId = parseInt(url.split('/')[2]);
                const updateAuthor = JSON.parse(body);
                const authorIndex = authors.findIndex((author) => author.id === authorId);

                if (authorIndex !== -1) {
                    authors[authorIndex] = {
                        id: authorId,
                        ... updateAuthor
                    };
                    writeAuthorFile(authors);
                    logAction("UPDATE_AUTHOR", authors[authorIndex]);
                    res.writeHead(201, {'Content-Type': " application/json"})
                    res.end(JSON.stringify(authors[authorIndex]))
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
            if (method === 'DELETE') { // xoa tac gia
                const authors = readAuthorData();
                const books = readBookData();

                const authorId = parseInt(url.split('/')[2]);
                const filteredAuthor = authors.filter((author) => author.id !== authorId);

                if (authors.length !== filteredAuthor.length) {
                    const filteredBooks = books.filter(book => book.authorId !== authorId);
                    writeAuthorFile(filteredAuthor);
                    writeBookFile(filteredBooks);
                    logAction("DELETE_AUTHOR", { id: authorId });
                    res.writeHead(200, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'OK'}))
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
        })
    } 
    else if (url.startsWith('/book')) {
        req.on('data', (data) => {
            body += data.toString();
        });
        req.on("end", () => {
            if (method === 'GET') { // lay tat ca sach
                const books = readBookData();
                const authors = readAuthorData();
                const urlObj = new URL(req.url, `http://${req.headers.host}`);// url để lấy query string
                const search = urlObj.searchParams.get('q')?.toLowerCase();
                if (search) {
                    const filteredBooks = books.filter(book => {
                        const titleMatch = book.title?.toLowerCase().includes(search);
                        const author = authors.find(author => author.id === book.authorId);
                        const authorNameMatch = author?.name?.toLowerCase().includes(search);
                        return titleMatch || authorNameMatch;
                    });
            
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(filteredBooks));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(books));
                }
            }
            if (method === 'POST') { // tao sach moi
                const books = readBookData();
                const authors = readAuthorData();
                const newBook = JSON.parse(body);
                const authorExists = authors.some(author => author.id === newBook.authorId);
                if (! authorExists) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: 'Tác giả không tồn tại.'}));
                    return;
                }
                newBook.id = books.length ? books[books.length - 1].id + 1 : 1 // id tu dong tang
                books.push(newBook);
                writeBookFile(books);
                logAction("ADD_BOOK", newBook);
                res.writeHead(201, {'Content-Type': " application/json"})
                res.end(JSON.stringify(newBook))
            }
            if (method === 'PUT') { // cap nhat sach hien tai
                const books = readBookData();
                const bookId = parseInt(url.split('/')[2]);
                const updateBook = JSON.parse(body);
                const bookIndex = books.findIndex((book) => book.id === bookId);

                if (bookIndex !== -1) {
                    books[bookIndex] = {
                        id: bookId,
                        ... updateBook
                    };
                    writeBookFile(books);
                    logAction("UPDATE_BOOK", books[bookIndex]);
                    res.writeHead(201, {'Content-Type': " application/json"})
                    res.end(JSON.stringify(books[bookIndex]))
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
            if (method === 'DELETE') { // xoa sach
                const books = readBookData();
                const bookId = parseInt(url.split('/')[2]);
                const filteredBook = books.filter((book) => book.id !== bookId);

                if (books.length !== filteredBook.length) {
                    writeBookFile(filteredBook);
                    logAction("DELETE_BOOK", { id: bookId });
                    res.writeHead(200, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'OK'}))
                } else {
                    res.writeHead(404, {'Content-Type': " application/json"})
                    res.end(JSON.stringify({message: 'Route not found'}))
                }
            }
        })
    } 
    else {
        res.writeHead(404, {'Content-Type': " application/json"})
        res.end(JSON.stringify({message: 'Route not found'}))
    }


})
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
// logger Là một module giúp ghi lại các hành động như: thêm, sửa, xóa,... vào một file log để dễ theo dõi lịch sử.