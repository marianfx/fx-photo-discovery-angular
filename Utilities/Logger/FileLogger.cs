using System.IO;

namespace Utilities.Logger
{
    class FileLogger : ILogger
    {
        public bool InBackground { get; set; }
        public string Path { get; set; }

        public FileLogger(string path = "./log.txt", bool executeInBackground = true)
        {
            InBackground = executeInBackground;
            Path = path;
        }

        public void Log(string message)
        {
            using (StreamWriter writer = new StreamWriter(Path))
            {
                if (InBackground)
                    writer.WriteLineAsync(message);
                else
                    writer.WriteLine(message);
            }
        }
    }
}
