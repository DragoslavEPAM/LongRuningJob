using System;
using LongRuningJob.Hubs;
using LongRuningJob.Services.Interface;
using Microsoft.AspNetCore.SignalR;

namespace LongRuningJob.Services
{
	public class ConverterService : IConverterService
	{
        private readonly IHubContext<ConverterHub> _hub;
        public bool running = false;

        public ConverterService(IHubContext<ConverterHub> hub)
        {
            _hub = hub;
        }

        public string ConvertToBase64(string plainText)
		{
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
			return System.Convert.ToBase64String(plainTextBytes);
        }

		public async void Convert(string plainText)
		{
            running = true;
            string base64String = ConvertToBase64(plainText);
            foreach (char c in base64String) if (running)
                {
                    await _hub.Clients.All.SendAsync("sendcharacter", c);
                    Random rnd = new Random();
                    Thread.Sleep(rnd.Next(1000, 5000));
                }
        }

        public void Cancel()
        {
            this.running = false;
        }
	}
}

