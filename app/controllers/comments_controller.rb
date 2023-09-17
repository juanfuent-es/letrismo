class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:destroy]

  def index
    @commentable = find_commentable
    @comments = @commentable.comments
  end

  def create
    @commentable = find_commentable
    @comment = @commentable.comments.build(comment_params)
    @comment.visitor_id = current_visitor.id
    @comment.save
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment_id = @comment.id
    @page = Page.find(@comment.commentable_id)
    @comment.destroy
    redirect_to page_path(@page.friendly_url), notice: "Comentario eliminado"
  end

  private

  def comment_params
    params.require(:comment).permit(:message, :name)
  end

  def find_commentable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        return $1.classify.constantize.find(value)
      end
    end
    nil
  end

end