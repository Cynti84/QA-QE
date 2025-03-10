type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  price: number;
  publisher: string;
  description: string;
  image: URL;
};

type BooksArray = Book[];

export { Book, BooksArray };
