import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';
import { AppContextProvider } from './context/AppContext';
import { AppThemeProvider } from './context/ThemeContext';

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
