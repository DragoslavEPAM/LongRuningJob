using LongRuningJob.Services.Interface;
using Microsoft.AspNetCore.SignalR;

namespace LongRuningJob.Hubs
{
	public class ConverterHub : Hub
    {
        private readonly IConverterService converterService;

        public bool running = false;

        public ConverterHub(IConverterService converterService)
		{
            this.converterService = converterService;
        }


        public void StartConvert(string request)
        {
            //converterService.Convert(request, cts.Token);
            _ = Task.Run(() => converterService.Convert(request));
            this.running = true;
        }

        public override Task OnDisconnectedAsync(Exception? e)
        {
            converterService.Cancel();
            return base.OnDisconnectedAsync(e);
        }
    }
}

