using ReportJ.Flare.Client.View;
using System.Windows;

namespace ReportJ.Flare.Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void About_Click(object sender, RoutedEventArgs e)
        {
            var about = new About();
            about.ShowDialog();
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            var result = MessageBox.Show(
                "Are sure you want to exit?",
                "Exit",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question,
                MessageBoxResult.No,
                MessageBoxOptions.DefaultDesktopOnly);

            if (result == MessageBoxResult.Yes)
            {
                Close();
            }
        }
    }
}
