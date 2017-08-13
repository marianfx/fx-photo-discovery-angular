namespace Utilities.Logger
{
    public interface ILogger
    {
        bool InBackground { get; set; }
        string Path { get; set; }

        void Log(string message);
    }
}
