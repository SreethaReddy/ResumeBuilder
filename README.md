# Resume Builder for Software Engineers

A modern web application for creating professional resumes tailored specifically for software engineers.

## Features

- Drag-and-drop interface for easy customization
- Real-time preview functionality
- Import data from LinkedIn and GitHub
- Multiple export formats (PDF, DOCX)
- Secure user authentication
- Responsive design for all devices
- Pre-designed industry-specific templates

## Tech Stack

- Frontend: React.js, Material-UI, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- File Export: PDFKit, docx

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
resume-builder/
├── frontend/           # React frontend application
├── backend/            # Node.js backend server
└── README.md
```

## License

MIT 