import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppContextProvider } from './context/AppContext/AppContext';
import { AppThemeProvider } from './context/ThemeContext/ThemeContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<AppContextProvider>
			<AppThemeProvider>
				<App />
			</AppThemeProvider>
		</AppContextProvider>
		<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
	</QueryClientProvider>,
);
