using System;
namespace LongRuningJob.Services.Interface
{
	public interface IConverterService
	{
		string ConvertToBase64(string input);
		public void Convert(string plainText);
		public void Cancel();

    }
}

