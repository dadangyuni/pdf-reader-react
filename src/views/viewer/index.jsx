import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import './index.css';

const App = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
          <div style={{ height: '100vh' }}>
              <Viewer
                  fileUrl={`${process.env.PUBLIC_URL}/assets/doc/javascript_tutorial.pdf`}
                  plugins={[
                      defaultLayoutPluginInstance,
                  ]}
              />
          </div>
      </Worker>
  );
}

export default App;
