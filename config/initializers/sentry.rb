if Rails.env.production?
    Sentry.init do |config|
        config.dsn = 'https://fd56aff2736342489d59dae280da5fe7@o91580.ingest.sentry.io/6327266'
        config.breadcrumbs_logger = [:active_support_logger, :http_logger]

        # Set tracesSampleRate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production
        # config.traces_sample_rate = 1.0
        # or
        config.traces_sampler = lambda do |context|
            true
        end

    end
end