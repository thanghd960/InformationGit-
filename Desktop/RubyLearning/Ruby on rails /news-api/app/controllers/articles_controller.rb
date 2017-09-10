class ArticlesController < ApplicationController
	before_action :set_article, only: [:show, :update, :destroy]
	def index
		@articles = Article.all
		render json: @articles
	end
	def show
		render json: @article
	end
	def create
		@article = Article.new(post_params)
		if article.save
			render json: @article, status: :created, location: @article
		else
			render json: @article.error, status: :unprocessable_entity
		end
	end
	privateThôi 
		def set_article
			@article = Article.find(params[:id])
		end
		def post_params
			params.required(:article).permit!
		end
end
