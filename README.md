# Mockifier

A powerful mock data generation tool built with Angular. Mockifier helps you create realistic test data by defining attributes and their possible values.

## Features

- Create mock data attributes with multiple data types
- Import/Export attribute configurations (JSON, CSV, XLSX)
- Generate customizable number of mock data records
- Preview generated data before export
- Support for various data types including:
  - Text
  - Boolean
  - Bit
  - Numeric
  - Integer Range
  - Float Range
  - Date Range

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (v19.0.1)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mockifier.git
cd mockifier
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200/` in your browser

## Usage

1. Add attributes manually or import from a file
2. Configure data types and possible values
3. Set generation options
4. Preview generated data
5. Export in desired format

## Development

### Development server

```bash
ng serve
```

### Building for production

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Running tests

```bash
ng test
```

## File Format Support

### CSV Format
```csv
Name,Text,John,Jane,Bob
Age,Numeric,25,30,35
Active,Boolean,true,false
```

### XLSX Format
- First row: Attribute names
- Second row: Types (optional)
- Following rows: Values

### JSON Format
```json
[{
  "attrName": "Name",
  "type": "Text",
  "values": ["John", "Jane", "Bob"]
}]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Angular](https://angular.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)