import React, { Component } from 'react';
import Popup from './ui/Popup'; // bu sizda alohida fayl bo'lishi kerak

export default class Book extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      genre: '',
      year: '',
      price: '',
      data: [],
      showForm: false,
      editingId: null,
    };
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    const { title, author, genre, year, price, data, editingId } = this.state;

    if (editingId) {
      // Update
      const updatedData = data.map((book) =>
        book.id === editingId
          ? { ...book, title, author, genre, year, price }
          : book
      );

      this.setState({
        data: updatedData,
        title: '',
        author: '',
        genre: '',
        year: '',
        price: '',
        editingId: null,
        showForm: false,
      });
    } else {
      // Create
      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        year,
        price,
        status: 'Available',
      };

      this.setState({
        data: [...data, newBook],
        title: '',
        author: '',
        genre: '',
        year: '',
        price: '',
        showForm: false,
      });
    }
  };

  handleEdit = (id) => {
    const book = this.state.data.find((b) => b.id === id);
    this.setState({
      ...book,
      editingId: id,
      showForm: true,
    });
  };

  handleDelete = (id) => {
    const newData = this.state.data.filter((book) => book.id !== id);
    this.setState({ data: newData });
  };

  render() {
    const { title, author, genre, year, price, data } = this.state;

    return (
      <div>
        <div className="mt-10 container mx-auto">
          <input
            className="border w-[70%] h-[50px] rounded-[12px] pl-3"
            type="text"
            placeholder="qidirish..."
          />
          <button
            className="border h-[50px] w-[50px] rounded-[9px] ml-7 bg-blue-700 text-white text-xl"
            onClick={() =>
              this.setState({
                showForm: true,
                title: '',
                author: '',
                genre: '',
                year: '',
                price: '',
                editingId: null,
              })
            }
          >
            ➕
          </button>
        </div>

        <table className="w-[100%] mt-[40px] max-w-[1000px] ml-[170px] mx-auto border-collapse shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] rounded-[10px] overflow-hidden border-b-[#1e92b3]">
          <thead className="bg-[#1e86b6] text-white">
            <tr>
              <th className="p-[15px_10px] text-left text-[16px]">№</th>
              <th className="p-[15px_10px] text-left text-[16px]">Title</th>
              <th className="p-[15px_10px] text-left text-[16px]">Author</th>
              <th className="p-[15px_10px] text-left text-[16px]">Genre</th>
              <th className="p-[15px_10px] text-left text-[16px]">Year</th>
              <th className="p-[15px_10px] text-left text-[16px]">Price</th>
              <th className="p-[15px_10px] text-left text-[16px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => (
              <tr
                key={book.id}
                className="bg-white text-[#333] text-[15px] hover:bg-[rgba(129,129,128,0.301)]"
              >
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {index + 1}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {book.title}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {book.author}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {book.genre}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {book.year}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {book.price}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  <button
                    className="text-yellow-600 mr-3"
                    onClick={() => this.handleEdit(book.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => this.handleDelete(book.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Popup
          isShow={this.state.showForm}
          onClose={() => this.setState({ showForm: false })}
        >
          <div className="bg-white rounded-[8px] p-6 w-[900px]">
            <h2 className="text-xl font-semibold mb-4">
              {this.state.editingId ? 'Edit Book' : 'Add Book'}
            </h2>
            <form onSubmit={this.handlerSubmit}>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                value={title}
                onChange={(e) => this.setState({ title: e.target.value })}
                type="text"
                placeholder="Title..."
                className="w-full px-4 py-2 border rounded-xl shadow-sm"
              />

              <label className="block text-sm font-medium mt-4 mb-2">
                Author
              </label>
              <input
                value={author}
                onChange={(e) => this.setState({ author: e.target.value })}
                type="text"
                placeholder="Author..."
                className="w-full px-4 py-2 border rounded-xl shadow-sm"
              />

              <label className="block text-sm font-medium mt-4 mb-2">
                Genre
              </label>
              <input
                value={genre}
                onChange={(e) => this.setState({ genre: e.target.value })}
                type="text"
                placeholder="Genre..."
                className="w-full px-4 py-2 border rounded-xl shadow-sm"
              />

              <label className="block text-sm font-medium mt-4 mb-2">
                Year
              </label>
              <input
                value={year}
                onChange={(e) => this.setState({ year: e.target.value })}
                type="text"
                placeholder="Year..."
                className="w-full px-4 py-2 border rounded-xl shadow-sm"
              />

              <label className="block text-sm font-medium mt-4 mb-2">
                Price
              </label>
              <input
                value={price}
                onChange={(e) => this.setState({ price: e.target.value })}
                type="text"
                placeholder="Price..."
                className="w-full px-4 py-2 border rounded-xl shadow-sm"
              />

              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {this.state.editingId ? 'Update Book' : 'Add Book'}
              </button>
            </form>
          </div>
        </Popup>
      </div>
    );
  }
}
